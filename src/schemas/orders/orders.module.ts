import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from 'src/controllers/order/order.controller';
import { OrderService } from 'src/services/order/order.service';
import { OrderSchema } from './order';
import { ProductsModule } from '../products/products.module';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]), ProductsModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
