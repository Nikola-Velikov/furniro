import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewSchema } from './reviews';
import { ReviewService } from 'src/services/reviews/reviews.service';
import { ReviewController } from 'src/controllers/review/review.controller';
import { ProductsService } from 'src/services/products/products.service';
import { ProductsModule } from '../products/products.module';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Review', schema: ReviewSchema }]), ProductsModule],
  providers: [ReviewService],
  controllers: [ReviewController]
})
export class ReviewModule {}
