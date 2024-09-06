"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = void 0;
const mongoose_1 = require("mongoose");
exports.OrderSchema = new mongoose_1.Schema({
    products: [
        {
            productId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            name: { type: String, required: true }
        },
    ],
    firstName: { type: String, required: true, minlength: 2, maxlength: 256 },
    lastName: { type: String, required: true, minlength: 2, maxlength: 256 },
    companyName: { type: String, minlength: 2, maxlength: 256 },
    address: {
        country: { type: String, required: true, minlength: 2, maxlength: 256 },
        city: { type: String, required: true, minlength: 2, maxlength: 256 },
        streetAddress: { type: String, required: true, minlength: 2, maxlength: 512 },
        postalCode: { type: String, required: true },
    },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, match: /.+\@.+\..+/ },
    additionalInfo: { type: String, maxlength: 1024 },
}, { timestamps: true });
//# sourceMappingURL=order.js.map