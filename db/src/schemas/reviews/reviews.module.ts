import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewSchema } from './reviews';
import { ReviewService } from 'src/services/reviews/reviews.service';
import { ReviewController } from 'src/controllers/review/review.controller';
import { ProductsModule } from '../products/products.module';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Review', schema: ReviewSchema }]),forwardRef(() => ProductsModule) ],
  providers: [ReviewService],
  controllers: [ReviewController],
  exports: [ReviewService]
 
})
export class ReviewModule {}
