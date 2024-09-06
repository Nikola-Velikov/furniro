export declare class OrderDTO {
    products: {
        productId: string;
        name: string;
        quantity: number;
        price: number;
    }[];
    first_name: string;
    last_name: string;
    company_name?: string;
    country: string;
    city: string;
    address: string;
    postal_code: string;
    phone_number: string;
    email: string;
    additional_info?: string;
}
