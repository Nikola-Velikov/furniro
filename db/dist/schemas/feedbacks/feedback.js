"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackSchema = void 0;
const mongoose_1 = require("mongoose");
exports.FeedbackSchema = new mongoose_1.Schema({
    name: { type: String, required: true, minlength: 2, maxlength: 256 },
    email: { type: String, required: true, minlength: 2, maxlength: 256, match: /.+\@.+\..+/ },
    subject: { type: String, required: true, minlength: 2, maxlength: 256 },
    message: { type: String, required: true, minlength: 2, maxlength: 2048 },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });
//# sourceMappingURL=feedback.js.map