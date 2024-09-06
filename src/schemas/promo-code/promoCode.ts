import { Schema } from "mongoose";

export const PromoCodeSchema = new Schema({
    code: { type: String, required: true, unique: true },
    used: { type: Boolean, default: false },
    percentage: { type: Number, default: 15 },
  });