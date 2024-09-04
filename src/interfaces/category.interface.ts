// src/category/category.interface.ts
import { Document } from 'mongoose';

export interface Category extends Document {
  id: string;
  name: string;
  cover_photo: string;
  createdAt: Date;
  updatedAt: Date;
}
