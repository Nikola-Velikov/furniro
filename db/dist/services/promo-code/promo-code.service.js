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
exports.PromoCodeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let PromoCodeService = class PromoCodeService {
    constructor(promoCodeModel) {
        this.promoCodeModel = promoCodeModel;
    }
    async createPromoCode(code) {
        const promoCode = new this.promoCodeModel({ code });
        return promoCode.save();
    }
    async findUnusedPromoCode() {
        return this.promoCodeModel.findOne({ used: false }).exec();
    }
    async validatePromoCode(code) {
        const promoCode = await this.promoCodeModel.findOne({ code, used: false }).exec();
        if (!promoCode) {
            return 0;
        }
        else {
            await this.promoCodeModel.findOneAndUpdate({ code, used: true }).exec();
        }
        return promoCode.percentage;
    }
    async generatePromoCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let promoCode = '';
        for (let i = 0; i < 10; i++) {
            promoCode += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return promoCode;
    }
    async markAsUsed(code) {
        return this.promoCodeModel.findOneAndUpdate({ code }, { used: true }, { new: true }).exec();
    }
};
exports.PromoCodeService = PromoCodeService;
exports.PromoCodeService = PromoCodeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('PromoCode')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PromoCodeService);
//# sourceMappingURL=promo-code.service.js.map