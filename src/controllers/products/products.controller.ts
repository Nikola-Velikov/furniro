import { Controller, Get, Post, Body, Param, Delete, Put, UploadedFiles, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductsService } from 'src/services/products/products.service';
import { Product } from 'src/interfaces/product.interface';
import { ProductDTO } from 'src/dto/product';
import { ApiResponse } from '@nestjs/swagger';
import * as path from 'path';
import * as multer from 'multer';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('products') 
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  
  @ApiResponse({
    status: 200,
    description: 'List of all products',
    type: ProductDTO,
    
  })
  @Get()
  async findAll(): Promise<Product[] | String> {
    
    return this.productsService.findAll();
  }
  @ApiResponse({
    status: 200,
    description: 'Gives one product',
    type: ProductDTO,
    
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product | null> {
    return this.productsService.findOne(id);
  }

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'cover_photo', maxCount: 1 },
    { name: 'additional_photos', maxCount: 10 } // Adjust maxCount based on your needs
  ], {
    storage: multer.diskStorage({
      destination: './uploads', // Directory where files will be saved
      filename: (req, file, callback) => {
        const filename = `${Date.now()}${path.extname(file.originalname)}`;
        callback(null, filename);
      },
    }),
  }))
  async create(@Body() productDto: ProductDTO, @UploadedFiles() files: { cover_photo?: Express.Multer.File[], additional_photos?: Express.Multer.File[] }) {
    if (files.cover_photo && files.cover_photo[0]) {
      productDto.cover_photo = files.cover_photo[0].filename;
    }

    if (files.additional_photos) {
      productDto.additional_photos = files.additional_photos.map(file => file.filename);
    }

    return this.productsService.create(productDto);
  }


  
  @ApiResponse({
    status: 200,
    description: 'Updates one of the products',
    type: ProductDTO,
    
  })
  @Put(':id')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'cover_photo', maxCount: 1 },
    { name: 'additional_photos', maxCount: 10 } // Adjust maxCount based on your needs
  ], {
    storage: multer.diskStorage({
      destination: './uploads', // Directory where files will be saved
      filename: (req, file, callback) => {
        const filename = `${Date.now()}${path.extname(file.originalname)}`;
        callback(null, filename);
      },
    }),
  }))
  async update(
    @Param('id') id: string,
    @Body() productDto: ProductDTO,
    @UploadedFiles() files: { cover_photo?: Express.Multer.File[], additional_photos?: Express.Multer.File[] }
  ): Promise<Product | null> {
    if (files.cover_photo && files.cover_photo[0]) {
      productDto.cover_photo = files.cover_photo[0].filename;
    }

    if (files.additional_photos) {
      productDto.additional_photos = files.additional_photos.map(file => file.filename);
    }

    return this.productsService.update(id, productDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Product | null> {
    return this.productsService.remove(id);
  }
}
