import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailListSchema } from './mail-list';
import { MailListController } from 'src/controllers/mail-list/mail-list.controller';
import { MailListService } from 'src/services/mail-list/mail-list.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'MailList', schema: MailListSchema }])],
  controllers: [MailListController],
  providers: [MailListService],
})
export class MailListModule {}