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
exports.FeedbackController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const feedback_1 = require("../../dto/feedback");
const validate_object_id_pipe_1 = require("../../pipes/validate-object-id.pipe");
const feedback_service_1 = require("../../services/feedback/feedback.service");
let FeedbackController = class FeedbackController {
    constructor(feedbackService) {
        this.feedbackService = feedbackService;
    }
    async findAll() {
        return await this.feedbackService.findAll();
    }
    async findFeedbackById(id) {
        return await this.feedbackService.findOne(id);
    }
    async createFeedback(feedback) {
        return await this.feedbackService.create(feedback);
    }
    async updateFeedback(id, reviewDto) {
        return this.feedbackService.update(id, reviewDto);
    }
    async deleteFeedback(id) {
        return await this.feedbackService.delete(id);
    }
};
exports.FeedbackController = FeedbackController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all feedbacks' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Successfully retrieved all feedbacks',
        type: [feedback_1.FeedbackDTO],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FeedbackController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get feedback by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', required: true, description: 'Feedback ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Successfully retrieved feedback',
        type: feedback_1.FeedbackDTO,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Feedback not found' }),
    __param(0, (0, common_1.Param)('id', validate_object_id_pipe_1.ValidateObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FeedbackController.prototype, "findFeedbackById", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new feedback' }),
    (0, swagger_1.ApiBody)({ type: feedback_1.FeedbackDTO }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Feedback successfully created',
        type: feedback_1.FeedbackDTO,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FeedbackController.prototype, "createFeedback", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update feedback by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', required: true, description: 'Feedback ID' }),
    (0, swagger_1.ApiBody)({ type: feedback_1.FeedbackDTO }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Feedback successfully updated',
        type: feedback_1.FeedbackDTO,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Feedback not found' }),
    __param(0, (0, common_1.Param)('id', validate_object_id_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, feedback_1.FeedbackDTO]),
    __metadata("design:returntype", Promise)
], FeedbackController.prototype, "updateFeedback", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete feedback by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', required: true, description: 'Feedback ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Feedback successfully deleted',
        type: feedback_1.FeedbackDTO,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Feedback not found' }),
    __param(0, (0, common_1.Param)('id', validate_object_id_pipe_1.ValidateObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FeedbackController.prototype, "deleteFeedback", null);
exports.FeedbackController = FeedbackController = __decorate([
    (0, swagger_1.ApiTags)('Feedbacks'),
    (0, common_1.Controller)('feedback'),
    __metadata("design:paramtypes", [feedback_service_1.FeedbackService])
], FeedbackController);
//# sourceMappingURL=feedback.controller.js.map