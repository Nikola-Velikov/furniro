import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter;

  constructor() {
    // Configure the transporter for nodemailer
    this.transporter = nodemailer.createTransport({
      host: 'smtp.example.com', // Replace with your SMTP server details
      port: 587,
      secure: false,
      auth: {
        user: 'your-email@example.com', // Replace with your email
        pass: 'your-password', // Replace with your email password
      },
    });
  }

  async sendMail(to: string, subject: string, html: string): Promise<void> {
    const mailOptions = {
      from: '"Your App" <your-email@example.com>', // Replace with your sender info
      to,
      subject,
      html,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
