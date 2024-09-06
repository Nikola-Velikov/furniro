import { IsString, IsNumber, IsOptional, IsBoolean, IsArray, Min, Max, Length, IsDecimal, ValidateNested, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDTO {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Cool Gadget',
  })
  @IsString()
  @Length(3, 512)
  readonly name: string;

  @ApiProperty({
    description: 'A short description of the product',
    example: 'This is a short description of the product.',
  })
  @IsString()
  @Length(3, 512)
  readonly short_description: string;

  @ApiProperty({
    description: 'The full description of the product',
    example: 'This is a detailed description of the product.',
  })
  @IsString()
  @Length(32)
  readonly description: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 299.99,
    type: 'number',
  })
  @IsDecimal()
  readonly price: number;

  @ApiProperty({
    description: 'The discount percentage for the product',
    example: 10,
    type: 'number',
    minimum: 0,
    maximum: 100,
    required: false,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  readonly discount?: number;

  @ApiProperty({
    description: 'The quantity of the product in stock',
    example: 100,
    type: 'number',
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  readonly quality: number;

  @ApiProperty({
    description: 'Whether the product is marked as new',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  readonly mark_as_new?: boolean;

  @ApiProperty({
    description: 'URL of the cover photo for the product',
    example: 'https://example.com/images/cool-gadget.jpg',
  })
  @IsString()
   cover_photo: string;

  @ApiProperty({
    description: 'URLs of additional photos for the product',
    example: ['https://example.com/images/cool-gadget1.jpg', 'https://example.com/images/cool-gadget2.jpg'],
    type: [String],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
   additional_photos?: string[];

  @ApiProperty({
    description: 'Available sizes for the product',
    example: ['S', 'M', 'L', 'XL'],
    type: [String],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  readonly sizes?: string[];

  @ApiProperty({
    description: 'Available colors for the product',
    example: ['red', 'blue', 'green'],
    type: [String],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  readonly colors?: string[];
}
