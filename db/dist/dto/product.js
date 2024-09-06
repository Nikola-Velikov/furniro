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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDTO = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class ProductDTO {
}
exports.ProductDTO = ProductDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The name of the product',
        example: 'Cool Gadget',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 512),
    __metadata("design:type", String)
], ProductDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'A short description of the product',
        example: 'This is a short description of the product.',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 512),
    __metadata("design:type", String)
], ProductDTO.prototype, "short_description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The full description of the product',
        example: 'This is a detailed description of the product.',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(32),
    __metadata("design:type", String)
], ProductDTO.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The price of the product',
        example: 299.99,
        type: 'number',
    }),
    (0, class_validator_1.IsDecimal)(),
    __metadata("design:type", Number)
], ProductDTO.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The discount percentage for the product',
        example: 10,
        type: 'number',
        minimum: 0,
        maximum: 100,
        required: false,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ProductDTO.prototype, "discount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The quantity of the product in stock',
        example: 100,
        type: 'number',
        minimum: 0,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ProductDTO.prototype, "quality", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the product is marked as new',
        example: true,
        required: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], ProductDTO.prototype, "mark_as_new", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL of the cover photo for the product',
        example: 'https://example.com/images/cool-gadget.jpg',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductDTO.prototype, "cover_photo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URLs of additional photos for the product',
        example: ['https://example.com/images/cool-gadget1.jpg', 'https://example.com/images/cool-gadget2.jpg'],
        type: [String],
        required: false,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ProductDTO.prototype, "additional_photos", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Available sizes for the product',
        example: ['S', 'M', 'L', 'XL'],
        type: [String],
        required: false,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ProductDTO.prototype, "sizes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Available colors for the product',
        example: ['red', 'blue', 'green'],
        type: [String],
        required: false,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ProductDTO.prototype, "colors", void 0);
//# sourceMappingURL=product.js.map