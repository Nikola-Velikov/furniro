import { Schema, Types } from 'mongoose';
export declare const ProductSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    description: string;
    short_description: string;
    price: Types.Decimal128;
    discount: number;
    quality: number;
    mark_as_new: boolean;
    cover_photo: string;
    additional_photos: string[];
    sizes: string[];
    colors: string[];
    category: {
        prototype?: Types.ObjectId;
        cacheHexString?: unknown;
        generate?: {};
        createFromTime?: {};
        createFromHexString?: {};
        createFromBase64?: {};
        isValid?: {};
    };
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    description: string;
    short_description: string;
    price: Types.Decimal128;
    discount: number;
    quality: number;
    mark_as_new: boolean;
    cover_photo: string;
    additional_photos: string[];
    sizes: string[];
    colors: string[];
    category: {
        prototype?: Types.ObjectId;
        cacheHexString?: unknown;
        generate?: {};
        createFromTime?: {};
        createFromHexString?: {};
        createFromBase64?: {};
        isValid?: {};
    };
}>> & import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    description: string;
    short_description: string;
    price: Types.Decimal128;
    discount: number;
    quality: number;
    mark_as_new: boolean;
    cover_photo: string;
    additional_photos: string[];
    sizes: string[];
    colors: string[];
    category: {
        prototype?: Types.ObjectId;
        cacheHexString?: unknown;
        generate?: {};
        createFromTime?: {};
        createFromHexString?: {};
        createFromBase64?: {};
        isValid?: {};
    };
}> & {
    _id: Types.ObjectId;
}>;
