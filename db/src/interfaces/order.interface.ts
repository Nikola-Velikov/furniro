export interface Order {
    products: {
      productId: string;
      quantity: number;
      price: number;
      name: string;
    }[];
    first_name: string;
    last_name: string;
    company_name?: string;
    address: string;
    country: string;
    city: string;
    postal_code: string;
    phone_number: string;
    email: string;
    additional_info?: string;
    createdAt: Date;

  }
  