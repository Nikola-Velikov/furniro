import { Schema, Types } from 'mongoose';

export const ProductSchema = new Schema({
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
    type: Schema.Types.Decimal128,  
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
    type: Types.ObjectId,
    ref: 'Category', 
    required: true,
  },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields
