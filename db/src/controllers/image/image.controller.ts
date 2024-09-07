import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ImageService } from 'src/services/image/image.service';

@ApiTags('Images')
@Controller('images')
export class ImageController {
  constructor(private readonly imagesService: ImageService) {}

  @Get('generateImages')
  @ApiOperation({ summary: 'Fetch images from Unsplash based on a keyword and limit' })
  @ApiQuery({ name: 'limit', type: Number, required: false, description: 'The maximum number of images to retrieve' })
  @ApiQuery({ name: 'keyword', type: String, required: true, description: 'The keyword to search for images' })
  @ApiResponse({ status: 200, description: 'Images fetched successfully' })
  @ApiResponse({ status: 400, description: 'Keyword is required' })
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
