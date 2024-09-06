import { Schema } from 'mongoose';

export const ReviewSchema = new Schema(
  {
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
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    
  },
  { timestamps: true }, // Automatically adds createdAt and updatedAt fields
);
