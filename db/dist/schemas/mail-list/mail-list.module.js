"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailListModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mail_list_1 = require("./mail-list");
const mail_list_controller_1 = require("../../controllers/mail-list/mail-list.controller");
const mail_list_service_1 = require("../../services/mail-list/mail-list.service");
let MailListModule = class MailListModule {
};
exports.MailListModule = MailListModule;
exports.MailListModule = MailListModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'MailList', schema: mail_list_1.MailListSchema }]),],
        controllers: [mail_list_controller_1.MailListController],
        providers: [mail_list_service_1.MailListService],
    })
], MailListModule);
//# sourceMappingURL=mail-list.module.js.map