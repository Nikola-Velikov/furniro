import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReviewDTO } from 'src/dto/review';
import { Review } from 'src/interfaces/review.interface';

@Injectable()
export class ReviewService {
  constructor(@InjectModel('Review') private readonly reviewModel: Model<Review>) {}

  // Create a new review
  async createReview(reviewDto: ReviewDTO): Promise<Review> {
    
    const newReview = new this.reviewModel(reviewDto);
    return newReview.save();
  }

  // Find all reviews
  async findAllReviews(): Promise<Review[]> {
    return this.reviewModel.find().exec();
  }

  // Find reviews by product
  async findReviewsByProduct(productId: string): Promise<Review[]> {
    return this.reviewModel.find({ product: productId }).exec();
  }

  // Find a review by ID
  async findReviewById(reviewId: string): Promise<Review> {
    const review = await this.reviewModel.findById(reviewId).exec();
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    return review;
  }

  // Update a review
  async updateReview(reviewId: string, reviewDto: ReviewDTO): Promise<Review> {
    const updatedReview = await this.reviewModel.findByIdAndUpdate(reviewId, reviewDto, { new: true }).exec();
    if (!updatedReview) {
      throw new NotFoundException('Review not found');
    }
    return updatedReview;
  }

  // Delete a review
  async deleteReview(reviewId: string): Promise<Review> {
    const deletedReview = await this.reviewModel.findByIdAndDelete(reviewId).exec();
    if (!deletedReview) {
      throw new NotFoundException('Review not found');
    }
    return deletedReview;
  }
}
