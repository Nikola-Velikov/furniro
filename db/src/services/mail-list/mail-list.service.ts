import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MailListDTO } from 'src/dto/mailList';
import { MailList } from 'src/interfaces/mailList';
import * as nodemailer from 'nodemailer';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class MailListService {
  private transporter;

  constructor(@InjectModel('MailList') private readonly mailListModel: Model<MailList>) {
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
    const unsubscribeLink = `http://localhost:3000/mail-list/unsubscribe/${to}`;
    const mailOptions = {
      from: 'your-email@gmail.com', // Replace with your Gmail address
      to,
      subject,
      html: `${html}<p><a href="${unsubscribeLink}">Unsubscribe</a></p>`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  async subscribe(emailDto: MailListDTO): Promise<MailList> {
    const newEmail = new this.mailListModel({ email: emailDto.email });
    return newEmail.save();
  }

  @Cron(CronExpression.EVERY_2_HOURS)  
  async sendNewsletter(): Promise<void> {
    const emailTemplates = [
      {
        subject: 'Newsletter - Issue 1',
        html: `<p>Welcome to our newsletter!</p><p>This is the first issue.</p>`,
      },
      {
        subject: 'Special Offer',
        html: `<p>We have an exclusive offer just for you!</p><p><a href="#">Click here</a> to learn more.</p>`,
      },
      {
        subject: 'Upcoming Events',
        html: `<p>Check out the upcoming events we have for you!</p>`,
      },
      {
        subject: 'Product Spotlight',
        html: `<p>Discover our latest product in the spotlight.</p>`,
      },
      {
        subject: 'Thank You for Subscribing',
        html: `<p>Thank you for being a loyal subscriber.</p><p>Stay tuned for more updates.</p>`,
      },
    ];

    // Fetch all emails from the database
    const mailList = await this.mailListModel.find().exec();
    if (!mailList || mailList.length === 0) {
      return;  // No subscribers to send emails to
    }

    // Cycle through templates and send emails to all subscribers
    for (const [index, subscriber] of mailList.entries()) {
      const template = emailTemplates[index % emailTemplates.length];  // Cycle through templates
      await this.sendMail(subscriber.email, template.subject, template.html);
    }
  }

  async unsubscribe(email: string): Promise<MailList | null> {
    console.log(email);
    
    return this.mailListModel.findOneAndDelete({ email }).exec();
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
