import { Document } from 'mongoose';

export interface PromoCode extends Document {
  code: string;
  used: boolean;
  percentage: number;
}