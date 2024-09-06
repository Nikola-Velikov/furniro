import { MailListDTO } from 'src/dto/mailList';
import { MailList } from 'src/interfaces/mailList';
import { MailListService } from 'src/services/mail-list/mail-list.service';
export declare class MailListController {
    private readonly mailListService;
    constructor(mailListService: MailListService);
    create(mailListDto: MailListDTO): Promise<MailList>;
    unsubscribe(email: string): Promise<MailList>;
    findAll(): Promise<MailList[]>;
    findOne(id: string): Promise<MailList>;
    update(id: string, mailListDto: MailListDTO): Promise<MailList>;
    delete(id: string): Promise<MailList>;
}
