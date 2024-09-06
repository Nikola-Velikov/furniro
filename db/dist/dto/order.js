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
exports.OrderDTO = void 0;
const class_validator_1 = require("class-validator");
class OrderDTO {
}
exports.OrderDTO = OrderDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], OrderDTO.prototype, "products", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 256),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OrderDTO.prototype, "first_name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 256),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OrderDTO.prototype, "last_name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 256),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrderDTO.prototype, "company_name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 256),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OrderDTO.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 256),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OrderDTO.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 512),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OrderDTO.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OrderDTO.prototype, "postal_code", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OrderDTO.prototype, "phone_number", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OrderDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 1024),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrderDTO.prototype, "additional_info", void 0);
//# sourceMappingURL=order.js.map