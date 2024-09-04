import { Schema } from 'mongoose';

export const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 512,
  },

  cover_photo: {
    type: String, 
    
  }

  },{ timestamps: true }); // Automatically adds createdAt and updatedAt fields
