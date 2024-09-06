"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ReviewSchema = new mongoose_1.Schema({
    value: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        minlength: 2,
        maxlength: 256,
        required: false,
    },
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
}, { timestamps: true });
//# sourceMappingURL=reviews.js.map