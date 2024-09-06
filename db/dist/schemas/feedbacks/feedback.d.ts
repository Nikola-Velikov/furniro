import { Schema } from 'mongoose';
export declare const FeedbackSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    message: string;
    email: string;
    subject: string;
    isDeleted: boolean;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    message: string;
    email: string;
    subject: string;
    isDeleted: boolean;
}>> & import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    message: string;
    email: string;
    subject: string;
    isDeleted: boolean;
}> & {
    _id: import("mongoose").Types.ObjectId;
}>;
