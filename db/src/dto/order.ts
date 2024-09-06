import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, IsNumber } from 'class-validator';

export class OrderDTO {
  @IsNotEmpty()
  products: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }[];

  @IsString()
  @Length(2, 256)
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @Length(2, 256)
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @Length(2, 256)
  @IsOptional()
  company_name?: string;

  @IsString()
  @Length(2, 256)
  @IsNotEmpty()
  country: string;

  @IsString()
  @Length(2, 256)
  @IsNotEmpty()
  city: string;

  @IsString()
  @Length(2, 512)
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  postal_code: string;

  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @Length(0, 1024)
  @IsOptional()
  additional_info?: string;

 
}
