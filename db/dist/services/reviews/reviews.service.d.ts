import { Model } from 'mongoose';
import { ReviewDTO } from 'src/dto/review';
import { Review } from 'src/interfaces/review.interface';
export declare class ReviewService {
    private readonly reviewModel;
    constructor(reviewModel: Model<Review>);
    createReview(reviewDto: ReviewDTO): Promise<Review>;
    findAllReviews(): Promise<Review[]>;
    findReviewsByProduct(productId: string): Promise<Review[]>;
    findReviewById(reviewId: string): Promise<Review>;
    updateReview(reviewId: string, reviewDto: ReviewDTO): Promise<Review>;
    deleteReview(reviewId: string): Promise<Review>;
}
