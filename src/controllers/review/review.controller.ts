import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { ReviewService } from 'src/services/reviews/reviews.service';
import { log } from 'console';
import { ReviewDTO } from 'src/dto/review';
import { Review } from 'src/interfaces/review.interface';
import { ProductsService } from 'src/services/products/products.service';


@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService, private readonly productsService: ProductsService) {}

  // Create a new review
  @Post()
  async createReview(@Body() reviewDto: ReviewDTO): Promise<Review> {
    const productExists = await this.productsService.findOne(reviewDto.product);
    if (!productExists) {
      throw new NotFoundException('Invalid product ID!');
    }
    
    return this.reviewService.createReview(reviewDto);
  }

  // Get all reviews
  @Get()
  async findAllReviews(): Promise<Review[]> {
    return this.reviewService.findAllReviews();
  }


  @Get('product/:productId')
  async findReviewsByProduct(@Param('productId') productId: string): Promise<Review[]> {
    return this.reviewService.findReviewsByProduct(productId);
  }

  @Get(':id')
  async findReviewById(@Param('id') id: string): Promise<Review> {
    return this.reviewService.findReviewById(id);
  }


  @Put(':id')
  async updateReview(@Param('id') id: string, @Body() reviewDto: ReviewDTO): Promise<Review> {
    return this.reviewService.updateReview(id, reviewDto);
  }

 
  @Delete(':id')
  async deleteReview(@Param('id') id: string): Promise<Review> {
    return this.reviewService.deleteReview(id);
  }
}
