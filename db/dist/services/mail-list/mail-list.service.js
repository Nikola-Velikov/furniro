"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailListService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const nodemailer = require("nodemailer");
const schedule_1 = require("@nestjs/schedule");
let MailListService = class MailListService {
    constructor(mailListModel) {
        this.mailListModel = mailListModel;
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
    async sendMail(to, subject, html) {
        const unsubscribeLink = `http://localhost:3000/mail-list/unsubscribe/${to}`;
        const mailOptions = {
            from: 'your-email@gmail.com',
            to,
            subject,
            html: `${html}<p><a href="${unsubscribeLink}">Unsubscribe</a></p>`,
        };
        try {
            await this.transporter.sendMail(mailOptions);
        }
        catch (error) {
            console.error('Error sending email:', error);
        }
    }
    async subscribe(emailDto) {
        const newEmail = new this.mailListModel({ email: emailDto.email });
        return newEmail.save();
    }
    async sendNewsletter() {
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
        const mailList = await this.mailListModel.find().exec();
        if (!mailList || mailList.length === 0) {
            return;
        }
        for (const [index, subscriber] of mailList.entries()) {
            const template = emailTemplates[index % emailTemplates.length];
            await this.sendMail(subscriber.email, template.subject, template.html);
        }
    }
    async unsubscribe(email) {
        console.log(email);
        return this.mailListModel.findOneAndDelete({ email }).exec();
    }
    async create(mailListDto) {
        const mailList = new this.mailListModel(mailListDto);
        return mailList.save();
    }
    async findAll() {
        return this.mailListModel.find().exec();
    }
    async findOne(id) {
        const mailList = await this.mailListModel.findById(id).exec();
        if (!mailList) {
            throw new common_1.NotFoundException('MailList entry not found');
        }
        return mailList;
    }
    async update(id, mailListDto) {
        const updatedMailList = await this.mailListModel.findByIdAndUpdate(id, mailListDto, { new: true }).exec();
        if (!updatedMailList) {
            throw new common_1.NotFoundException('MailList entry not found');
        }
        return updatedMailList;
    }
    async delete(id) {
        const result = await this.mailListModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException('MailList entry not found');
        }
        return result;
    }
};
exports.MailListService = MailListService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_2_HOURS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MailListService.prototype, "sendNewsletter", null);
exports.MailListService = MailListService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('MailList')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MailListService);
//# sourceMappingURL=mail-list.service.js.map