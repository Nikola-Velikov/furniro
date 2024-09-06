import { Document } from 'mongoose';

export interface MailList extends Document<string> {

  email: string;
 
}