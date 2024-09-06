import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MailListService } from './mailSender.service';

@Controller()
export class PaymentListenerController {
    constructor(private readonly mailListService: MailListService) {} // Inject the MailListService
  @EventPattern('payment.success')
  async handlePaymentSuccess(@Payload() data: any) {
    console.log(data.promoCode);
    
    const email = data.customer_email
    const promoCode = data.promoCode
    await this.mailListService.sendDiscountEmail(email, promoCode);
    
  }
}
