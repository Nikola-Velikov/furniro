"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromoCodeSchema = void 0;
const mongoose_1 = require("mongoose");
exports.PromoCodeSchema = new mongoose_1.Schema({
    code: { type: String, required: true, unique: true },
    used: { type: Boolean, default: false },
    percentage: { type: Number, default: 15 },
});
//# sourceMappingURL=promoCode.js.map