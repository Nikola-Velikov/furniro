import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './schemas/products/products.module';
import { DatabaseModule } from './database/database.module';
import { CategoryModule } from './schemas/category/category.module';
import { ReviewModule } from './schemas/reviews/reviews.module';
import { FeedbacksModule } from './schemas/feedbacks/feedbacks.module';

@Module({
  imports: [DatabaseModule, ProductsModule, CategoryModule, ReviewModule, FeedbacksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
