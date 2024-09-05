import { Schema } from 'mongoose';

export const MailListSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 256,
      match: /.+\@.+\..+/,
    },
  },
  { timestamps: true },
);
