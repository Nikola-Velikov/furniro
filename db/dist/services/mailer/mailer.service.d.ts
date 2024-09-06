export declare class MailerService {
    private transporter;
    constructor();
    sendMail(to: string, subject: string, html: string): Promise<void>;
}
