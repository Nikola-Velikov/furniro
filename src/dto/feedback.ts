import { IsString, IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FeedbackDTO {
  @ApiProperty({
    description: 'The name of the client',
    example: 'John Doe',
  })
  @IsString()
  @Length(2, 256)
  readonly name: string;

  @ApiProperty({
    description: 'The email address of the client',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @Length(2, 256)
  readonly email: string;

  @ApiProperty({
    description: 'The subject of the feedback',
    example: 'Product Inquiry',
  })
  @IsString()
  @Length(2, 256)
  readonly subject: string;

  @ApiProperty({
    description: 'The message from the client',
    example: 'I have an issue with the product I bought.',
  })
  @IsString()
  @Length(2, 2048)
  readonly message: string;
}
