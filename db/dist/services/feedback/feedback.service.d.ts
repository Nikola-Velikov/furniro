import { Model } from 'mongoose';
import { FeedbackDTO } from 'src/dto/feedback';
import { Feedback } from 'src/interfaces/feedback.interface';
export declare class FeedbackService {
    private readonly feedbackModel;
    constructor(feedbackModel: Model<Feedback>);
    create(feedbackDTO: FeedbackDTO): Promise<Feedback>;
    findAll(): Promise<Feedback[]>;
    findOne(id: string): Promise<Feedback>;
    update(id: string, feedbackDTO: FeedbackDTO): Promise<Feedback>;
    delete(id: string): Promise<Feedback>;
}
