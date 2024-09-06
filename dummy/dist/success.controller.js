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
exports.PaymentListenerController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const mailSender_service_1 = require("./mailSender.service");
let PaymentListenerController = class PaymentListenerController {
    constructor(mailListService) {
        this.mailListService = mailListService;
    }
    async handlePaymentSuccess(data) {
        console.log(data.promoCode);
        const email = data.customer_email;
        const promoCode = data.promoCode;
        await this.mailListService.sendDiscountEmail(email, promoCode);
    }
};
exports.PaymentListenerController = PaymentListenerController;
__decorate([
    (0, microservices_1.EventPattern)('payment.success'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentListenerController.prototype, "handlePaymentSuccess", null);
exports.PaymentListenerController = PaymentListenerController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [mailSender_service_1.MailListService])
], PaymentListenerController);
//# sourceMappingURL=success.controller.js.map