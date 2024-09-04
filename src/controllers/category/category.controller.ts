// src/category/category.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Category } from 'src/interfaces/category.interface';
import { CategoryDto } from 'src/dto/category';
import { CategoryService } from 'src/services/category/category.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiResponse } from '@nestjs/swagger';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('cover_photo', {
      storage: diskStorage({
        destination: './uploads', // Directory where files will be saved
        filename: (req, file, callback) => {
          const filename = `${Date.now()}${extname(file.originalname)}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async create(
    @Body() categoryDto: CategoryDto,
    @UploadedFile() file: Express.Multer.File, // Ensure the type is correct
  ) {
    if (file) {
      categoryDto.cover_photo = file.filename; // Correctly set the cover_photo property
    }

    return this.categoryService.create(categoryDto);
  }
  @ApiResponse({
    status: 200,
    description: 'Updates one of the products',
    type: CategoryDto,
    
  })
  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Category> {
    
    return this.categoryService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('cover_photo', {
      storage: diskStorage({
        destination: './uploads', // Directory where files will be saved
        filename: (req, file, callback) => {
          const filename = `${Date.now()}${extname(file.originalname)}`;
          callback(null, filename);
        },
      }),
    }),
  )
  
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: CategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Category> {
    if (file) {
      updateCategoryDto.cover_photo = file.filename; // Correctly set the cover_photo property
    }
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Category> {
    return this.categoryService.delete(id);
  }
}
