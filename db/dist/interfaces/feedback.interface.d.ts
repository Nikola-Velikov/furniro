import { Document } from 'mongoose';
export interface Feedback extends Document {
    name: string;
    email: string;
    subject: string;
    message: string;
    isDeleted: boolean;
}
