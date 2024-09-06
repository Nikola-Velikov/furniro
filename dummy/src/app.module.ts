import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailListenerService } from './email.service';
import { PaymentListenerController } from './success.controller';
import { MailListService } from './mailSender.service';

@Module({
  imports: [],
  controllers: [AppController, PaymentListenerController],
  providers: [AppService, EmailListenerService, MailListService],
})
export class AppModule {}
