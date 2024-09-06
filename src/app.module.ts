import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './schemas/products/products.module';
import { DatabaseModule } from './database/database.module';
import { CategoryModule } from './schemas/category/category.module';
import { ReviewModule } from './schemas/reviews/reviews.module';
import { FeedbacksModule } from './schemas/feedbacks/feedbacks.module';
import { MailListModule } from './schemas/mail-list/mail-list.module';
import { ScheduleModule } from '@nestjs/schedule';
import { OrderModule } from './schemas/orders/orders.module';
import { GatewayModule } from './services/gateway/gateway.websockets.module';
import { GatewayService } from './services/gateway/gateway.service';
import { PromoCodeModule } from './schemas/promo-code/promo-code.module';
import { ImageController } from './controllers/image/image.controller';
import { ImageService } from './services/image/image.service';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [DatabaseModule, ProductsModule, CategoryModule, ReviewModule, FeedbacksModule, MailListModule, OrderModule, GatewayModule, PromoCodeModule, HttpModule, ScheduleModule.forRoot(),],
  controllers: [AppController, ImageController],
  providers: [AppService, GatewayService, ImageService],
})
export class AppModule {}
