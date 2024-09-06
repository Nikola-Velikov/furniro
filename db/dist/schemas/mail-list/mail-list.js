"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailListSchema = void 0;
const mongoose_1 = require("mongoose");
exports.MailListSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 256,
        match: /.+\@.+\..+/,
    },
}, { timestamps: true });
//# sourceMappingURL=mail-list.js.map