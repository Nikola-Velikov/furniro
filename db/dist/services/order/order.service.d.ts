import { Model } from 'mongoose';
import { OrderDTO } from 'src/dto/order';
import { Order } from 'src/interfaces/order.interface';
export declare class OrderService {
    private readonly orderModel;
    constructor(orderModel: Model<Order>);
    create(createOrderDto: OrderDTO): Promise<Order>;
    findAll(): Promise<Order[]>;
    findOne(id: string): Promise<Order>;
    update(id: string, updateOrderDto: OrderDTO): Promise<Order>;
    delete(id: string): Promise<Order>;
}
