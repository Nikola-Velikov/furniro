import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FeedbackDTO } from 'src/dto/feedback';
import { Feedback } from 'src/interfaces/feedback.interface';
import { ValidateObjectIdPipe } from 'src/pipes/validate-object-id.pipe';
import { FeedbackService } from 'src/services/feedback/feedback.service';

@ApiTags('Feedbacks')
@Controller('feedback')
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  @Get()
  @ApiOperation({ summary: 'Get all feedbacks' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all feedbacks',
    type: [FeedbackDTO],
  })
  async findAll(): Promise<Feedback[]> {
    return await this.feedbackService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get feedback by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Feedback ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved feedback',
    type: FeedbackDTO,
  })
  @ApiResponse({ status: 404, description: 'Feedback not found' })
  async findFeedbackById(
    @Param('id', ValidateObjectIdPipe) id: string,
  ): Promise<Feedback> {
    return await this.feedbackService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new feedback' })
  @ApiBody({ type: FeedbackDTO })
  @ApiResponse({
    status: 201,
    description: 'Feedback successfully created',
    type: FeedbackDTO,
  })
  async createFeedback(@Body() feedback: Feedback): Promise<Feedback> {
    return await this.feedbackService.create(feedback);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update feedback by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Feedback ID' })
  @ApiBody({ type: FeedbackDTO })
  @ApiResponse({
    status: 200,
    description: 'Feedback successfully updated',
    type: FeedbackDTO,
  })
  @ApiResponse({ status: 404, description: 'Feedback not found' })
  async updateFeedback(
    @Param('id', ValidateObjectIdPipe) id: string,
    @Body() reviewDto: FeedbackDTO,
  ): Promise<Feedback> {
    return this.feedbackService.update(id, reviewDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete feedback by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Feedback ID' })
  @ApiResponse({
    status: 200,
    description: 'Feedback successfully deleted',
    type: FeedbackDTO,
  })
  @ApiResponse({ status: 404, description: 'Feedback not found' })
  async deleteFeedback(
    @Param('id', ValidateObjectIdPipe) id: string,
  ): Promise<Feedback> {
    return await this.feedbackService.delete(id);
  }
}
