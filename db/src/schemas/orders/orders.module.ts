import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from 'src/controllers/order/order.controller';
import { OrderService } from 'src/services/order/order.service';
import { OrderSchema } from './order';
import { ProductsModule } from '../products/products.module';
import { GatewayModule } from 'src/services/gateway/gateway.websockets.module';
import { PromoCodeModule } from '../promo-code/promo-code.module';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]), ProductsModule, GatewayModule, PromoCodeModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
