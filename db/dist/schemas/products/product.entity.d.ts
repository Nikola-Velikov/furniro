export declare class ProductEntity {
    id: number;
    name: string;
    short_description: string;
    description: string;
    price: number;
    discount: number;
    quality: number;
    mark_as_new: boolean;
    cover_photo: string;
    additional_photos: string[];
    sizes: string[];
    colors: string[];
    createdAt: Date;
    updatedAt: Date;
}
