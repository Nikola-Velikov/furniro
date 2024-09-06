import { Model } from 'mongoose';
import { MailListDTO } from 'src/dto/mailList';
import { MailList } from 'src/interfaces/mailList';
export declare class MailListService {
    private readonly mailListModel;
    private transporter;
    constructor(mailListModel: Model<MailList>);
    sendMail(to: string, subject: string, html: string): Promise<void>;
    subscribe(emailDto: MailListDTO): Promise<MailList>;
    sendNewsletter(): Promise<void>;
    unsubscribe(email: string): Promise<MailList | null>;
    create(mailListDto: MailListDTO): Promise<MailList>;
    findAll(): Promise<MailList[]>;
    findOne(id: string): Promise<MailList>;
    update(id: string, mailListDto: MailListDTO): Promise<MailList>;
    delete(id: string): Promise<MailList>;
}
