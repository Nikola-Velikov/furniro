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
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("../../services/products/products.service");
const category_service_1 = require("../../services/category/category.service");
const product_1 = require("../../dto/product");
const swagger_1 = require("@nestjs/swagger");
const path = require("path");
const multer = require("multer");
const platform_express_1 = require("@nestjs/platform-express");
const mongoose_1 = require("mongoose");
const validate_object_id_pipe_1 = require("../../pipes/validate-object-id.pipe");
let ProductsController = class ProductsController {
    constructor(productsService, categoryService) {
        this.productsService = productsService;
        this.categoryService = categoryService;
    }
    async findAll(category, page, productNumber, sortBy, sortDirection = 'asc') {
        const options = {
            sort: {},
        };
        if (category) {
            if (!mongoose_1.Types.ObjectId.isValid(category)) {
                throw new common_1.BadRequestException('Invalid category ID!');
            }
            const categoryExists = await this.categoryService.findOne(category);
            if (!categoryExists) {
                throw new common_1.NotFoundException('Category not found!');
            }
        }
        if (sortBy) {
            const direction = sortDirection === 'desc' ? -1 : 1;
            options.sort[sortBy] = direction;
        }
        if (page && productNumber) {
            options.page = Math.max(page, 1);
            options.limit = Math.max(productNumber, 1);
        }
        if (category) {
            if (!page && !productNumber) {
                return this.productsService.findByCategory(category, options.sort);
            }
            return this.productsService.findPaginatedByCategory(category, options);
        }
        if (!page && !productNumber) {
            return this.productsService.findAll(options.sort);
        }
        return this.productsService.findPaginated(options);
    }
    async findOne(id) {
        return this.productsService.findOne(id);
    }
    async create(productDto, files) {
        if (files.cover_photo && files.cover_photo[0]) {
            productDto.cover_photo = files.cover_photo[0].filename;
        }
        if (files.additional_photos) {
            productDto.additional_photos = files.additional_photos.map(file => file.filename);
        }
        return this.productsService.create(productDto);
    }
    async update(id, productDto, files) {
        if (files.cover_photo && files.cover_photo[0]) {
            productDto.cover_photo = files.cover_photo[0].filename;
        }
        if (files.additional_photos) {
            productDto.additional_photos = files.additional_photos.map(file => file.filename);
        }
        return this.productsService.update(id, productDto);
    }
    async remove(id) {
        return this.productsService.remove(id);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all products' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of all products',
        type: [product_1.ProductDTO],
    }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('category')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('productNumber')),
    __param(3, (0, common_1.Query)('sortBy')),
    __param(4, (0, common_1.Query)('sortDirection')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Gives one product',
        type: product_1.ProductDTO,
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve a product by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Details of a single product',
        type: product_1.ProductDTO,
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', validate_object_id_pipe_1.ValidateObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new product' }),
    (0, swagger_1.ApiBody)({ type: product_1.ProductDTO, description: 'Product details' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Product created successfully',
        type: product_1.ProductDTO,
    }),
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'cover_photo', maxCount: 1 },
        { name: 'additional_photos', maxCount: 10 }
    ], {
        storage: multer.diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
                const filename = `${Date.now()}${path.extname(file.originalname)}`;
                callback(null, filename);
            },
        }),
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_1.ProductDTO, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update a product by ID' }),
    (0, swagger_1.ApiBody)({ type: product_1.ProductDTO, description: 'Updated product details' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Product updated successfully',
        type: product_1.ProductDTO,
    }),
    (0, common_1.Put)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'cover_photo', maxCount: 1 },
        { name: 'additional_photos', maxCount: 10 }
    ], {
        storage: multer.diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
                const filename = `${Date.now()}${path.extname(file.originalname)}`;
                callback(null, filename);
            },
        }),
    })),
    __param(0, (0, common_1.Param)('id', validate_object_id_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, product_1.ProductDTO, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a product by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Product deleted successfully',
        type: product_1.ProductDTO,
    }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', validate_object_id_pipe_1.ValidateObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "remove", null);
exports.ProductsController = ProductsController = __decorate([
    (0, swagger_1.ApiTags)('Products'),
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService, category_service_1.CategoryService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map