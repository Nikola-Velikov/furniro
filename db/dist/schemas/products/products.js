"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 512,
    },
    short_description: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 512,
    },
    description: {
        type: String,
        required: true,
        minlength: 32,
    },
    price: {
        type: mongoose_1.Schema.Types.Decimal128,
        required: true,
    },
    discount: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
    },
    quality: {
        type: Number,
        required: true,
        min: 0,
    },
    mark_as_new: {
        type: Boolean,
        default: false,
    },
    cover_photo: {
        type: String,
        required: true,
    },
    additional_photos: {
        type: [String],
        default: [],
    },
    sizes: {
        type: [String],
        default: [],
    },
    colors: {
        type: [String],
        default: [],
    },
    category: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
}, { timestamps: true });
//# sourceMappingURL=products.js.map