import { Controller, Get, Query } from '@nestjs/common';
import { ImageService } from 'src/services/image/image.service';

@Controller('images')
export class ImageController {
  constructor(private readonly imagesService: ImageService) {}

  @Get('generateImages')
  async generateImages(
    @Query('limit') limit: number,
    @Query('keyword') keyword: string,
  ): Promise<any> {
    if (!limit || limit <= 0) {
      limit = 10; // Default limit
    }

    if (!keyword) {
      throw new Error('Keyword is required');
    }

    return this.imagesService.fetchImages(keyword, limit);
  }
}
