import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as nodemailer from 'nodemailer';


@Injectable()
export class MailListService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'furniro2024@gmail.com',
        pass: 'ekrm mnph abis covl',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendMail(to: string, subject: string, html: string): Promise<void> {
    const mailOptions = {
      from: 'furniro2024@gmail.com',
      to,
      subject,
      html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  

  async sendDiscountEmail(email: string, promoCode:string): Promise<void> {
    const subject = 'Exclusive 15% Discount Just for You!';
    const html = `<p>Thank you for your purchase!</p><p>Use promo code <strong>${promoCode}</strong> to get 15% off your next order.</p>`;
    
    await this.sendMail(email, subject, html);
    console.log("Email Sent!");
  }
}
