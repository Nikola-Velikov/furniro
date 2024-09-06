import { FeedbackDTO } from 'src/dto/feedback';
import { Feedback } from 'src/interfaces/feedback.interface';
import { FeedbackService } from 'src/services/feedback/feedback.service';
export declare class FeedbackController {
    private feedbackService;
    constructor(feedbackService: FeedbackService);
    findAll(): Promise<Feedback[]>;
    findFeedbackById(id: string): Promise<Feedback>;
    createFeedback(feedback: Feedback): Promise<Feedback>;
    updateFeedback(id: string, reviewDto: FeedbackDTO): Promise<Feedback>;
    deleteFeedback(id: string): Promise<Feedback>;
}
