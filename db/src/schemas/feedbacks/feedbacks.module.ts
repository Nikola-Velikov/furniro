import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedbackSchema } from './feedback';
import { FeedbackController } from 'src/controllers/feedback/feedback.controller';
import { FeedbackService } from 'src/services/feedback/feedback.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Feedback', schema: FeedbackSchema }]),
  ],
  controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class FeedbacksModule {}
