export declare class MailListService {
    private transporter;
    constructor();
    sendMail(to: string, subject: string, html: string): Promise<void>;
    sendDiscountEmail(email: string, promoCode: string): Promise<void>;
}
