import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MailListDTO } from 'src/dto/mailList';
import { MailList } from 'src/interfaces/mailList';
import * as nodemailer from 'nodemailer';


@Injectable()
export class MailListService {
    private transporter;

  constructor(@InjectModel('MailList') private readonly mailListModel: Model<MailList>) {
    this.transporter = nodemailer.createTransport({
        host: 'smtp.example.com', // Replace with your SMTP server details
        port: 587,
        secure: false,
        auth: {
          user: 'furniro2024@gmail.com', // Replace with your email
          pass: 'furniro123', // Replace with your email password
        },
      });
  }

  async create(mailListDto: MailListDTO): Promise<MailList> {
    const mailList = new this.mailListModel(mailListDto);
    return mailList.save();
  }

  async findAll(): Promise<MailList[]> {
    return this.mailListModel.find().exec();
  }

  async findOne(id: string): Promise<MailList> {
    const mailList = await this.mailListModel.findById(id).exec();
    if (!mailList) {
      throw new NotFoundException('MailList entry not found');
    }
    return mailList;
  }

  async update(id: string, mailListDto: MailListDTO): Promise<MailList> {
    const updatedMailList = await this.mailListModel.findByIdAndUpdate(id, mailListDto, { new: true }).exec();
    if (!updatedMailList) {
      throw new NotFoundException('MailList entry not found');
    }
    return updatedMailList;
  }

  async delete(id: string): Promise<MailList> {
    const result = await this.mailListModel.findByIdAndDelete(id).exec();
    if (!result) {
        throw new NotFoundException('MailList entry not found');
    }
    return result;
  }
  
}
