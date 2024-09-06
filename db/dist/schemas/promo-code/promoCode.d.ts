import { Schema } from "mongoose";
export declare const PromoCodeSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    code: string;
    used: boolean;
    percentage: number;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    code: string;
    used: boolean;
    percentage: number;
}>> & import("mongoose").FlatRecord<{
    code: string;
    used: boolean;
    percentage: number;
}> & {
    _id: import("mongoose").Types.ObjectId;
}>;
