import { Controller, Get, Post, Put, Delete, Param, Body, Res, NotFoundException, Query } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { lastValueFrom } from 'rxjs';
import { Socket } from 'socket.io';
import { OrderDTO } from 'src/dto/order';
import { Order } from 'src/interfaces/order.interface';
import { ValidateObjectIdPipe } from 'src/pipes/validate-object-id.pipe';
import { GatewayService } from 'src/services/gateway/gateway.service';
import { OrderService } from 'src/services/order/order.service';
import { ProductsService } from 'src/services/products/products.service';
import { PromoCodeService } from 'src/services/promo-code/promo-code.service';
import Stripe from 'stripe';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
    private stripe: Stripe;
  constructor(private readonly orderService: OrderService, private readonly productService: ProductsService, private readonly gatewayService: GatewayService, private readonly promoCodeService: PromoCodeService,) {
    this.stripe = new Stripe('sk_test_51NmgFuKfIAbVTk5mD0KYAAWCdRfPkb14ViemJ6ZbojShgpm17Zge1D8KelnoeNohSsG4cUxquvfOMVoxnkKmzQ8n00YI3fbhqs', {
        apiVersion: "2024-06-20",
      });
  }
  @Client({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3001,
    },
  })
  private client: ClientProxy;

  @Post()
  async createCheckoutSession(@Body() order: OrderDTO, @Query('promoCode') promoCode?: string): Promise<CheckoutUrl> {
    
    await this.orderService.create(order);

    if (!order || !order.products || order.products.length === 0) {
      throw new NotFoundException('Order details are missing');
    }

    if (!order.email) {
      throw new NotFoundException('Email is required');
    }
const lineItems = [];
    for (const product of order.products) {
        const productDetails = await this.productService.findOne(product.productId);
  
        if (!productDetails) {
          throw new NotFoundException(`Product with ID ${product.productId} not found`);
        }
        if(productDetails.quantity < product.quantity) {
          throw new NotFoundException(`Too much quantity for product ${productDetails.name}`);

        }

        const discountPercentage = promoCode ? await this.promoCodeService.validatePromoCode(promoCode) : 0;
        

        const unitAmount = productDetails.discountedPrice 
        const discountedPrice = discountPercentage > 0 ? (unitAmount - (unitAmount * discountPercentage / 100) ).toFixed(2): unitAmount;
  
        lineItems.push({
          price_data: {
            currency: 'bgn',
            product_data: {
              name: product.name,   
              images:['http://localhost:3000/uploads/' + productDetails.coverPhoto],  
            },
            unit_amount: discountedPrice*100, 
          },
          quantity: product.quantity,
        });
      }

    const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card', ],
        line_items: lineItems,
      mode: 'payment',
      customer_email: order.email,
      success_url: 'http://localhost:3000/orders/success?session_id={CHECKOUT_SESSION_ID}',  
      cancel_url: 'http://localhost:3000/cancel',  
    });
    

    const url = { checkoutUrl: session.url };
    return url;
  }

  @Get('success')
  async handleSuccess(@Query('session_id') sessionId: string, @Res() res): Promise<void | NotFoundException> {
    const session = await this.stripe.checkout.sessions.retrieve(sessionId);
    
    if (session.payment_status === 'paid') {
       const payload = { customer_email: session.customer_email };
       this.gatewayService.sendEmailPayloadToClients(payload);
    
       const promoCode = await this.promoCodeService.generatePromoCode();
       await this.promoCodeService.createPromoCode(promoCode)
       const observable$ = this.client.emit('payment.success', { customer_email: session.customer_email, promoCode: promoCode});
       await lastValueFrom(observable$);
      return res.redirect('http://localhost:3000/success-page'); 
    } else {
      throw new NotFoundException('Payment not completed');
    }
  }

  @Get('cancel')
  async handleCancel(@Res() res): Promise<void> {
    return res.redirect('http://localhost:3000/cancel-page'); 
  }
  @Get()
  async findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ValidateObjectIdPipe) id: string): Promise<Order> {
    return this.orderService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id', ValidateObjectIdPipe) id: string, @Body() updateOrderDto: OrderDTO): Promise<Order> {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  async delete(@Param('id', ValidateObjectIdPipe) id: string): Promise<Order> {
    return this.orderService.delete(id);
  }
}
