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
exports.PromoCodeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const promo_code_service_1 = require("../../services/promo-code/promo-code.service");
let PromoCodeController = class PromoCodeController {
    constructor(promoCodeService) {
        this.promoCodeService = promoCodeService;
    }
    async createPromoCode(code) {
        return this.promoCodeService.createPromoCode(code);
    }
    async markPromoCodeAsUsed(code) {
        return this.promoCodeService.markAsUsed(code);
    }
};
exports.PromoCodeController = PromoCodeController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new promo code' }),
    (0, swagger_1.ApiBody)({ description: 'Promo code to create', type: String }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Promo code created successfully',
    }),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PromoCodeController.prototype, "createPromoCode", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Mark a promo code as used' }),
    (0, swagger_1.ApiBody)({ description: 'Promo code to mark as used', type: String }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Promo code marked as used',
    }),
    (0, common_1.Post)('mark-used'),
    __param(0, (0, common_1.Body)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PromoCodeController.prototype, "markPromoCodeAsUsed", null);
exports.PromoCodeController = PromoCodeController = __decorate([
    (0, swagger_1.ApiTags)('Promo Codes'),
    (0, common_1.Controller)('promo-codes'),
    __metadata("design:paramtypes", [promo_code_service_1.PromoCodeService])
], PromoCodeController);
//# sourceMappingURL=promo-code.controller.js.map