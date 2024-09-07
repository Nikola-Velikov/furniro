"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const common_1 = require("@nestjs/common");
const reviews_service_1 = require("../../services/reviews/reviews.service");
const review_1 = require("../../dto/review");
const products_service_1 = require("../../services/products/products.service");
const swagger_1 = require("@nestjs/swagger");
const validate_object_id_pipe_1 = require("../../pipes/validate-object-id.pipe");
let ReviewController = class ReviewController {
    constructor(reviewService, productsService) {
        this.reviewService = reviewService;
        this.productsService = productsService;
    }
    async createReview(reviewDto) {
        const productExists = await this.productsService.findOne(reviewDto.product);
        if (!productExists) {
            throw new common_1.NotFoundException('Invalid product ID!');
        }
        return this.reviewService.createReview(reviewDto);
    }
    async findAllReviews() {
        return this.reviewService.findAllReviews();
    }
    async findReviewsByProduct(productId) {
        return this.reviewService.findReviewsByProduct(productId);
    }
    async findReviewById(id) {
        return this.reviewService.findReviewById(id);
    }
    async updateReview(id, reviewDto) {
        return this.reviewService.updateReview(id, reviewDto);
    }
    async deleteReview(id) {
        return this.reviewService.deleteReview(id);
    }
};
exports.ReviewController = ReviewController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new review for a product' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Review created successfully', type: review_1.ReviewDTO }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [review_1.ReviewDTO]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "createReview", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all reviews' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all reviews', type: [review_1.ReviewDTO] }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "findAllReviews", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get reviews by product ID' }),
    (0, swagger_1.ApiParam)({ name: 'productId', description: 'ID of the product' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of reviews for the product', type: [review_1.ReviewDTO] }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found' }),
    (0, common_1.Get)('product/:productId'),
    __param(0, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "findReviewsByProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get review by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID of the review' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The review with the given ID', type: review_1.ReviewDTO }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Review not found' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', validate_object_id_pipe_1.ValidateObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "findReviewById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update review by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID of the review to update' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Review updated successfully', type: review_1.ReviewDTO }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Review not found' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', validate_object_id_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, review_1.ReviewDTO]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "updateReview", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete review by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID of the review to delete' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Review deleted successfully', type: review_1.ReviewDTO }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Review not found' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', validate_object_id_pipe_1.ValidateObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "deleteReview", null);
exports.ReviewController = ReviewController = __decorate([
    (0, swagger_1.ApiTags)('Reviews'),
    (0, common_1.Controller)('reviews'),
    __metadata("design:paramtypes", [reviews_service_1.ReviewService, products_service_1.ProductsService])
], ReviewController);
//# sourceMappingURL=review.controller.js.map