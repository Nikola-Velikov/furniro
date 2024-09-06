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
exports.FeedbackService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let FeedbackService = class FeedbackService {
    constructor(feedbackModel) {
        this.feedbackModel = feedbackModel;
    }
    async create(feedbackDTO) {
        const newFeedback = new this.feedbackModel(feedbackDTO);
        return await newFeedback.save();
    }
    async findAll() {
        return await this.feedbackModel.find({ isDeleted: false }).exec();
    }
    async findOne(id) {
        const feedback = await this.feedbackModel.findOne({ _id: id, isDeleted: false }).exec();
        if (!feedback) {
            throw new common_1.NotFoundException(`Feedback with ID ${id} not found`);
        }
        return feedback;
    }
    async update(id, feedbackDTO) {
        const updatedFeedback = await this.feedbackModel.findOneAndUpdate({ _id: id, isDeleted: false }, feedbackDTO, { new: true }).exec();
        if (!updatedFeedback) {
            throw new common_1.NotFoundException(`Feedback with ID ${id} not found`);
        }
        return updatedFeedback;
    }
    async delete(id) {
        const result = await this.feedbackModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true }).exec();
        if (!result) {
            throw new common_1.NotFoundException(`Feedback with ID ${id} not found`);
        }
        return result;
    }
};
exports.FeedbackService = FeedbackService;
exports.FeedbackService = FeedbackService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Feedback')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FeedbackService);
//# sourceMappingURL=feedback.service.js.map