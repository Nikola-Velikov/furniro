import { IsNumber, IsString, Min, Max, Length, IsOptional, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReviewDTO {
  @ApiProperty({ description: 'Rating value between 1 and 5', example: 4 })
  @IsNumber()
  @Min(1)
  @Max(5)
  readonly value: number;

  @ApiProperty({ description: 'Optional comment for the review', example: 'Great product!', required: false })
  @IsString()
  @IsOptional()
  @Length(2, 256)
  readonly comment?: string;

  @ApiProperty({ description: 'Product ID', example: '60c72b2f9b1e8a001c8e4c8b' })
  @IsMongoId()
  readonly product: string;
}