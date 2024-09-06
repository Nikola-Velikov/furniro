import { NotFoundException } from '@nestjs/common';
import { OrderDTO } from 'src/dto/order';
import { Order } from 'src/interfaces/order.interface';
import { GatewayService } from 'src/services/gateway/gateway.service';
import { OrderService } from 'src/services/order/order.service';
import { ProductsService } from 'src/services/products/products.service';
import { PromoCodeService } from 'src/services/promo-code/promo-code.service';
export declare class OrderController {
    private readonly orderService;
    private readonly productService;
    private readonly gatewayService;
    private readonly promoCodeService;
    private stripe;
    constructor(orderService: OrderService, productService: ProductsService, gatewayService: GatewayService, promoCodeService: PromoCodeService);
    private client;
    createCheckoutSession(order: OrderDTO, promoCode?: string): Promise<CheckoutUrl>;
    handleSuccess(sessionId: string, res: any): Promise<void | NotFoundException>;
    handleCancel(res: any): Promise<void>;
    findAll(): Promise<Order[]>;
    findOne(id: string): Promise<Order>;
    update(id: string, updateOrderDto: OrderDTO): Promise<Order>;
    delete(id: string): Promise<Order>;
}
