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
exports.MailListController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const mailList_1 = require("../../dto/mailList");
const validate_object_id_pipe_1 = require("../../pipes/validate-object-id.pipe");
const mail_list_service_1 = require("../../services/mail-list/mail-list.service");
let MailListController = class MailListController {
    constructor(mailListService) {
        this.mailListService = mailListService;
    }
    async create(mailListDto) {
        return this.mailListService.create(mailListDto);
    }
    async unsubscribe(email) {
        return this.mailListService.unsubscribe(email);
    }
    async findAll() {
        return this.mailListService.findAll();
    }
    async findOne(id) {
        return this.mailListService.findOne(id);
    }
    async update(id, mailListDto) {
        return this.mailListService.update(id, mailListDto);
    }
    async delete(id) {
        return this.mailListService.delete(id);
    }
};
exports.MailListController = MailListController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mailList_1.MailListDTO]),
    __metadata("design:returntype", Promise)
], MailListController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('unsubscribe/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MailListController.prototype, "unsubscribe", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MailListController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', validate_object_id_pipe_1.ValidateObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MailListController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', validate_object_id_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, mailList_1.MailListDTO]),
    __metadata("design:returntype", Promise)
], MailListController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', validate_object_id_pipe_1.ValidateObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MailListController.prototype, "delete", null);
exports.MailListController = MailListController = __decorate([
    (0, swagger_1.ApiTags)('Newsletters'),
    (0, common_1.Controller)('mail-list'),
    __metadata("design:paramtypes", [mail_list_service_1.MailListService])
], MailListController);
//# sourceMappingURL=mail-list.controller.js.map