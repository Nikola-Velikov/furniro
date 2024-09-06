import { Schema } from 'mongoose';
export declare const OrderSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    products: import("mongoose").Types.DocumentArray<{
        name: string;
        price: number;
        productId: import("mongoose").Types.ObjectId;
        quantity: number;
    }>;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address?: {
        country: string;
        city: string;
        streetAddress: string;
        postalCode: string;
    };
    companyName?: string;
    additionalInfo?: string;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    products: import("mongoose").Types.DocumentArray<{
        name: string;
        price: number;
        productId: import("mongoose").Types.ObjectId;
        quantity: number;
    }>;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address?: {
        country: string;
        city: string;
        streetAddress: string;
        postalCode: string;
    };
    companyName?: string;
    additionalInfo?: string;
}>> & import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    products: import("mongoose").Types.DocumentArray<{
        name: string;
        price: number;
        productId: import("mongoose").Types.ObjectId;
        quantity: number;
    }>;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address?: {
        country: string;
        city: string;
        streetAddress: string;
        postalCode: string;
    };
    companyName?: string;
    additionalInfo?: string;
}> & {
    _id: import("mongoose").Types.ObjectId;
}>;
