import { MailListService } from './mailSender.service';
export declare class PaymentListenerController {
    private readonly mailListService;
    constructor(mailListService: MailListService);
    handlePaymentSuccess(data: any): Promise<void>;
}
