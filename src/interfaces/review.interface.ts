import { Document } from 'mongoose';

export interface Review extends Document {
  readonly value: number;
  readonly comment?: string;
  readonly product: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
