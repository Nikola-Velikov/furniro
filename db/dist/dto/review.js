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
exports.ReviewDTO = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class ReviewDTO {
}
exports.ReviewDTO = ReviewDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Rating value between 1 and 5', example: 4 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], ReviewDTO.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Optional comment for the review', example: 'Great product!', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(2, 256),
    __metadata("design:type", String)
], ReviewDTO.prototype, "comment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Product ID', example: '60c72b2f9b1e8a001c8e4c8b' }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], ReviewDTO.prototype, "product", void 0);
//# sourceMappingURL=review.js.map