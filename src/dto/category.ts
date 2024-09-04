// src/category/dto/create-category.dto.ts
import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class    CategoryDto {
  @ApiProperty({
    description: 'The name of the category',
    example: 'Electronics',
  })
  @IsString()
  @Length(3, 512)
  readonly name: string;

  @ApiProperty({
    description: 'URL of the cover photo for the category',
    example: 'https://example.com/images/electronics.jpg',
  })
  @IsString()
   cover_photo: string;
}
