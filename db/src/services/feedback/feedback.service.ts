import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FeedbackDTO } from 'src/dto/feedback';
import { Feedback } from 'src/interfaces/feedback.interface';


@Injectable()
export class FeedbackService {
  constructor(@InjectModel('Feedback') private readonly feedbackModel: Model<Feedback>) {}

  async create(feedbackDTO: FeedbackDTO): Promise<Feedback> {
    const newFeedback = new this.feedbackModel(feedbackDTO);
    return await newFeedback.save();
  }

  async findAll(): Promise<Feedback[]> {
    return await this.feedbackModel.find({ isDeleted: false }).exec();  // Fetch only non-deleted feedback
  }

  async findOne(id: string): Promise<Feedback> {
    const feedback = await this.feedbackModel.findOne({ _id: id, isDeleted: false }).exec();  // Fetch non-deleted feedback by ID
    if (!feedback) {
      throw new NotFoundException(`Feedback with ID ${id} not found`);
    }
    return feedback;
  }

  async update(id: string, feedbackDTO: FeedbackDTO): Promise<Feedback> {
    const updatedFeedback = await this.feedbackModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      feedbackDTO,
      { new: true }
    ).exec();
    if (!updatedFeedback) {
      throw new NotFoundException(`Feedback with ID ${id} not found`);
    }
    return updatedFeedback;
  }

  async delete(id: string): Promise<Feedback> {
    const result = await this.feedbackModel.findByIdAndUpdate(
      id,
      { isDeleted: true },  
      { new: true }
    ).exec();
    if (!result) {
      throw new NotFoundException(`Feedback with ID ${id} not found`);
    }
    return result;
  }
}
