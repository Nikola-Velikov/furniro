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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const reviews_service_1 = require("../reviews/reviews.service");
let ProductsService = class ProductsService {
    constructor(productModel, reviewService) {
        this.productModel = productModel;
        this.reviewService = reviewService;
    }
    async getProductCount(category) {
        let filter = {};
        if (category) {
            filter = { category };
        }
        const count = await this.productModel.countDocuments(filter).exec();
        return count;
    }
    create(product) {
        const createdProduct = new this.productModel(product);
        return createdProduct.save();
    }
    async findAll(sort) {
        const products = await this.productModel
            .find()
            .sort(sort)
            .populate('category')
            .exec();
        const totalProductsCount = await this.getProductCount();
        const result = {
            products: products,
            totalProductsCount: totalProductsCount,
        };
        return result;
    }
    async findOne(id) {
        const product = await this.productModel
            .findById(id)
            .populate('category')
            .exec();
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        const reviews = await this.reviewService.findReviewsByProduct(id);
        let avgRating = 0;
        const discountPercent = product.discount || 0;
        const discountedPrice = (product.price -
            (product.price * discountPercent) / 100).toFixed(2);
        if (reviews.length > 0) {
            const reviewsCount = reviews.length;
            avgRating =
                reviews.reduce((sum, review) => sum + review.value, 0) / reviewsCount;
        }
        let relatedProducts = [];
        if (product.category) {
            relatedProducts = await this.productModel
                .find({ category: product.category._id, _id: { $ne: id } })
                .limit(4)
                .populate('category')
                .exec();
        }
        return { product, reviews, avgRating, discountedPrice, relatedProducts };
    }
    update(id, product) {
        return this.productModel
            .findByIdAndUpdate(id, product, { new: true })
            .exec();
    }
    remove(id) {
        return this.productModel.findByIdAndDelete(id).exec();
    }
    async findByCategory(categoryId, sort) {
        const products = await this.productModel
            .find({ category: categoryId })
            .sort(sort)
            .populate('category')
            .exec();
        const totalProductsCount = await this.getProductCount(categoryId);
        const result = {
            products: products,
            totalProductsCount: totalProductsCount,
        };
        return result;
    }
    async deleteByCategory(categoryId) {
        await this.productModel.deleteMany({ category: categoryId }).exec();
    }
    async findPaginated(options) {
        const products = await this.productModel
            .find()
            .sort(options.sort)
            .skip((options.page - 1) * options.limit)
            .limit(options.limit)
            .populate('category')
            .exec();
        const totalProductsCount = await this.getProductCount();
        const result = {
            products: products,
            totalProductsCount: totalProductsCount,
        };
        return result;
    }
    async findPaginatedByCategory(categoryId, options) {
        const products = await this.productModel
            .find({ category: categoryId })
            .sort(options.sort)
            .skip((options.page - 1) * options.limit)
            .limit(options.limit)
            .populate('category')
            .exec();
        const totalProductsCount = await this.getProductCount(categoryId);
        const result = {
            products: products,
            totalProductsCount: totalProductsCount,
        };
        return result;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Product')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        reviews_service_1.ReviewService])
], ProductsService);
//# sourceMappingURL=products.service.js.map