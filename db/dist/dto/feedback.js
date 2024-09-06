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
exports.FeedbackDTO = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class FeedbackDTO {
}
exports.FeedbackDTO = FeedbackDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The name of the client',
        example: 'John Doe',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 256),
    __metadata("design:type", String)
], FeedbackDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The email address of the client',
        example: 'john.doe@example.com',
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.Length)(2, 256),
    __metadata("design:type", String)
], FeedbackDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The subject of the feedback',
        example: 'Product Inquiry',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 256),
    __metadata("design:type", String)
], FeedbackDTO.prototype, "subject", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The message from the client',
        example: 'I have an issue with the product I bought.',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 2048),
    __metadata("design:type", String)
], FeedbackDTO.prototype, "message", void 0);
//# sourceMappingURL=feedback.js.map