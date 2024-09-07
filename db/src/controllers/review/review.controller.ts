import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { ReviewService } from 'src/services/reviews/reviews.service';
import { log } from 'console';
import { ReviewDTO } from 'src/dto/review';
import { Review } from 'src/interfaces/review.interface';
import { ProductsService } from 'src/services/products/products.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidateObjectIdPipe } from 'src/pipes/validate-object-id.pipe';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService, private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Create a new review for a product' })
  @ApiResponse({ status: 201, description: 'Review created successfully', type: ReviewDTO })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @Post()
  async createReview(@Body() reviewDto: ReviewDTO): Promise<Review> {
    const productExists = await this.productsService.findOne(reviewDto.product);
    if (!productExists) {
      throw new NotFoundException('Invalid product ID!');
    }
    
    return this.reviewService.createReview(reviewDto);
  }
  @ApiOperation({ summary: 'Get all reviews' })
  @ApiResponse({ status: 200, description: 'List of all reviews', type: [ReviewDTO] })
  @Get()
  async findAllReviews(): Promise<Review[]> {
    return this.reviewService.findAllReviews();
  }

  @ApiOperation({ summary: 'Get reviews by product ID' })
  @ApiParam({ name: 'productId', description: 'ID of the product' })
  @ApiResponse({ status: 200, description: 'List of reviews for the product', type: [ReviewDTO] })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @Get('product/:productId')
  async findReviewsByProduct(@Param('productId') productId: string): Promise<Review[]> {
    return this.reviewService.findReviewsByProduct(productId);
  }

  @ApiOperation({ summary: 'Get review by ID' })
  @ApiParam({ name: 'id', description: 'ID of the review' })
  @ApiResponse({ status: 200, description: 'The review with the given ID', type: ReviewDTO })
  @ApiResponse({ status: 404, description: 'Review not found' })
  @Get(':id')
  async findReviewById(@Param('id', ValidateObjectIdPipe) id: string): Promise<Review> {
    return this.reviewService.findReviewById(id);
  }

  @ApiOperation({ summary: 'Update review by ID' })
  @ApiParam({ name: 'id', description: 'ID of the review to update' })
  @ApiResponse({ status: 200, description: 'Review updated successfully', type: ReviewDTO })
  @ApiResponse({ status: 404, description: 'Review not found' })
  @Put(':id')
  async updateReview(@Param('id', ValidateObjectIdPipe) id: string, @Body() reviewDto: ReviewDTO): Promise<Review> {
    return this.reviewService.updateReview(id, reviewDto);
  }

  @ApiOperation({ summary: 'Delete review by ID' })
  @ApiParam({ name: 'id', description: 'ID of the review to delete' })
  @ApiResponse({ status: 200, description: 'Review deleted successfully', type: ReviewDTO })
  @ApiResponse({ status: 404, description: 'Review not found' })
  @Delete(':id')
  async deleteReview(@Param('id', ValidateObjectIdPipe) id: string): Promise<Review> {
    return this.reviewService.deleteReview(id);
  }
}
