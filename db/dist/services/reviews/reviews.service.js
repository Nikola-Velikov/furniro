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
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ReviewService = class ReviewService {
    constructor(reviewModel) {
        this.reviewModel = reviewModel;
    }
    async createReview(reviewDto) {
        const newReview = new this.reviewModel(reviewDto);
        return newReview.save();
    }
    async findAllReviews() {
        return this.reviewModel.find().exec();
    }
    async findReviewsByProduct(productId) {
        return this.reviewModel.find({ product: productId }).exec();
    }
    async findReviewById(reviewId) {
        const review = await this.reviewModel.findById(reviewId).exec();
        if (!review) {
            throw new common_1.NotFoundException('Review not found');
        }
        return review;
    }
    async updateReview(reviewId, reviewDto) {
        const updatedReview = await this.reviewModel.findByIdAndUpdate(reviewId, reviewDto, { new: true }).exec();
        if (!updatedReview) {
            throw new common_1.NotFoundException('Review not found');
        }
        return updatedReview;
    }
    async deleteReview(reviewId) {
        const deletedReview = await this.reviewModel.findByIdAndDelete(reviewId).exec();
        if (!deletedReview) {
            throw new common_1.NotFoundException('Review not found');
        }
        return deletedReview;
    }
};
exports.ReviewService = ReviewService;
exports.ReviewService = ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Review')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ReviewService);
//# sourceMappingURL=reviews.service.js.map