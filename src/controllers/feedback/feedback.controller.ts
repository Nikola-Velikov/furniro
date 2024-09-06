import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FeedbackDTO } from 'src/dto/feedback';
import { Feedback } from 'src/interfaces/feedback.interface';
import { ValidateObjectIdPipe } from 'src/pipes/validate-object-id.pipe';
import { FeedbackService } from 'src/services/feedback/feedback.service';

@ApiTags('Feedbacks')
@Controller('feedback')
export class FeedbackController {
    constructor(private feedbackService: FeedbackService){}

    @Get()
    async findAll(): Promise<Feedback[]>{
        return await this.feedbackService.findAll();
    }

    @Get(':id')
    async findFeedbackById(@Param('id', ValidateObjectIdPipe) id: string): Promise<Feedback>{
        return await this.feedbackService.findOne(id);
    }

    @Post()
    async createFeedback(@Body() feedback: Feedback): Promise<Feedback>{
        return await this.feedbackService.create(feedback)
    }

    @Put(':id')
    async updateFeedback(@Param('id', ValidateObjectIdPipe) id: string, @Body() reviewDto: FeedbackDTO): Promise<Feedback> {
      return this.feedbackService.update(id, reviewDto);
    }
  
    @Delete(':id')
    async deleteFeedback(@Param('id', ValidateObjectIdPipe) id: string): Promise<Feedback>{

        return await this.feedbackService.delete(id);
    }

}
