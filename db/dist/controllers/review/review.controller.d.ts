import { ReviewService } from 'src/services/reviews/reviews.service';
import { ReviewDTO } from 'src/dto/review';
import { Review } from 'src/interfaces/review.interface';
import { ProductsService } from 'src/services/products/products.service';
export declare class ReviewController {
    private readonly reviewService;
    private readonly productsService;
    constructor(reviewService: ReviewService, productsService: ProductsService);
    createReview(reviewDto: ReviewDTO): Promise<Review>;
    findAllReviews(): Promise<Review[]>;
    findReviewsByProduct(productId: string): Promise<Review[]>;
    findReviewById(id: string): Promise<Review>;
    updateReview(id: string, reviewDto: ReviewDTO): Promise<Review>;
    deleteReview(id: string): Promise<Review>;
}
