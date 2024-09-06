"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbacksModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const feedback_1 = require("./feedback");
const feedback_controller_1 = require("../../controllers/feedback/feedback.controller");
const feedback_service_1 = require("../../services/feedback/feedback.service");
let FeedbacksModule = class FeedbacksModule {
};
exports.FeedbacksModule = FeedbacksModule;
exports.FeedbacksModule = FeedbacksModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Feedback', schema: feedback_1.FeedbackSchema }]),
        ],
        controllers: [feedback_controller_1.FeedbackController],
        providers: [feedback_service_1.FeedbackService],
    })
], FeedbacksModule);
//# sourceMappingURL=feedbacks.module.js.map