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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const category_1 = require("../../dto/category");
const category_service_1 = require("../../services/category/category.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const swagger_1 = require("@nestjs/swagger");
const products_service_1 = require("../../services/products/products.service");
const validate_object_id_pipe_1 = require("../../pipes/validate-object-id.pipe");
let CategoryController = class CategoryController {
    constructor(categoryService, productsService) {
        this.categoryService = categoryService;
        this.productsService = productsService;
    }
    async create(categoryDto, file) {
        if (file) {
            categoryDto.cover_photo = file.filename;
        }
        return this.categoryService.create(categoryDto);
    }
    async findAll() {
        return this.categoryService.findAll();
    }
    async findOne(id) {
        return this.categoryService.findOne(id);
    }
    async update(id, updateCategoryDto, file) {
        if (file) {
            updateCategoryDto.cover_photo = file.filename;
        }
        return this.categoryService.update(id, updateCategoryDto);
    }
    async deleteCategory(categoryId, forceDelete) {
        const category = await this.categoryService.findOne(categoryId);
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        const products = await this.productsService.findByCategory(categoryId);
        if (products.products.length > 0) {
            if (forceDelete === 'true') {
                for (const product of products.products) {
                    await this.productsService.remove(product._id);
                }
                await this.categoryService.delete(categoryId);
                return `Category and its ${products.products.length} products have been deleted.`;
            }
            else {
                return 'Category contains products. Set forceDelete=true to delete both category and its products.';
            }
        }
        await this.categoryService.delete(categoryId);
        return 'Category deleted successfully (no products in the category).';
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new category' }),
    (0, swagger_1.ApiBody)({ type: category_1.CategoryDto, description: 'Category details' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Category created successfully', type: category_1.CategoryDto }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('cover_photo', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, callback) => {
                const filename = `${Date.now()}${(0, path_1.extname)(file.originalname)}`;
                callback(null, filename);
            },
        }),
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_1.CategoryDto, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Updates one of the products',
        type: category_1.CategoryDto,
    }),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all categories' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all categories', type: [category_1.CategoryDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get category by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Category ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Category found', type: category_1.CategoryDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Category not found' }),
    __param(0, (0, common_1.Param)('id', validate_object_id_pipe_1.ValidateObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a category by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Category ID' }),
    (0, swagger_1.ApiBody)({ type: category_1.CategoryDto, description: 'Updated category details' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Category updated successfully', type: category_1.CategoryDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Category not found' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('cover_photo', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, callback) => {
                const filename = `${Date.now()}${(0, path_1.extname)(file.originalname)}`;
                callback(null, filename);
            },
        }),
    })),
    __param(0, (0, common_1.Param)('id', validate_object_id_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, category_1.CategoryDto, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a category by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Category ID' }),
    (0, swagger_1.ApiQuery)({ name: 'forceDelete', required: false, type: 'string', description: 'Set true to force delete the category and its products' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Category deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Category not found' }),
    __param(0, (0, common_1.Param)('id', validate_object_id_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Query)('forceDelete')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteCategory", null);
exports.CategoryController = CategoryController = __decorate([
    (0, swagger_1.ApiTags)('Categories'),
    (0, common_1.Controller)('categories'),
    __metadata("design:paramtypes", [category_service_1.CategoryService,
        products_service_1.ProductsService])
], CategoryController);
//# sourceMappingURL=category.controller.js.map