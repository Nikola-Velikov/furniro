import { Document } from 'mongoose';

export interface Product extends Document {
  name: string;
  short_description: string;
  description: string;
  price: number;
  discount?: number;
  quality: number;
  mark_as_new?: boolean;
  cover_photo: string;
  additional_photos?: string[];
  sizes?: string[];
  colors?: string[];
}
