import { Schema } from 'mongoose';
export declare const ReviewSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    value: number;
    product: import("mongoose").Types.ObjectId;
    comment?: string;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    value: number;
    product: import("mongoose").Types.ObjectId;
    comment?: string;
}>> & import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    value: number;
    product: import("mongoose").Types.ObjectId;
    comment?: string;
}> & {
    _id: import("mongoose").Types.ObjectId;
}>;
