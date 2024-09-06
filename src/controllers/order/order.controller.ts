import { Controller, Get, Post, Put, Delete, Param, Body, Res, NotFoundException, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderDTO } from 'src/dto/order';
import { Order } from 'src/interfaces/order.interface';
import { ValidateObjectIdPipe } from 'src/pipes/validate-object-id.pipe';
import { OrderService } from 'src/services/order/order.service';
import { ProductsService } from 'src/services/products/products.service';
import Stripe from 'stripe';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
    private stripe: Stripe;
  constructor(private readonly orderService: OrderService, private readonly productService: ProductsService) {
    this.stripe = new Stripe('sk_test_51NmgFuKfIAbVTk5mD0KYAAWCdRfPkb14ViemJ6ZbojShgpm17Zge1D8KelnoeNohSsG4cUxquvfOMVoxnkKmzQ8n00YI3fbhqs', {
        apiVersion: "2024-06-20",
      });
  }

  @Post()
  async createCheckoutSession(@Body() order: OrderDTO): Promise<CheckoutUrl> {
    console.log(order);
    
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
  
        lineItems.push({
          price_data: {
            currency: 'bgn',
            product_data: {
              name: product.name,   
              images:['http://localhost:3000/uploads/' + productDetails.coverPhoto],  
            },
            unit_amount: productDetails.discountedPrice * 100, // Stripe uses cents, so multiply by 100
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
