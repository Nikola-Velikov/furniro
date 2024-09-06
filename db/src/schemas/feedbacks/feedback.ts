import { Schema } from 'mongoose';

export const FeedbackSchema = new Schema(
  {
    name: { type: String, required: true, minlength: 2, maxlength: 256 },
    email: { type: String, required: true, minlength: 2, maxlength: 256, match: /.+\@.+\..+/ },
    subject: { type: String, required: true, minlength: 2, maxlength: 256 },
    message: { type: String, required: true, minlength: 2, maxlength: 2048 },
    isDeleted: { type: Boolean, default: false },  // Soft delete field
  },
  { timestamps: true }
);

