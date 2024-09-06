"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorySchema = void 0;
const mongoose_1 = require("mongoose");
exports.CategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 512,
    },
    cover_photo: {
        type: String,
    }
}, { timestamps: true });
//# sourceMappingURL=category.js.map