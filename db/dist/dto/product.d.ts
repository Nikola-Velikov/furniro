export declare class ProductDTO {
    readonly name: string;
    readonly short_description: string;
    readonly description: string;
    readonly price: number;
    readonly discount?: number;
    readonly quality: number;
    readonly mark_as_new?: boolean;
    cover_photo: string;
    additional_photos?: string[];
    readonly sizes?: string[];
    readonly colors?: string[];
}
