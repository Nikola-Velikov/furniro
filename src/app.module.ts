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

@Module({
  imports: [DatabaseModule, ProductsModule, CategoryModule, ReviewModule, FeedbacksModule, MailListModule, OrderModule, ScheduleModule.forRoot(),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
