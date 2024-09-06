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
  Query,
  NotFoundException,
} from '@nestjs/common';
import { Category } from 'src/interfaces/category.interface';
import { CategoryDto } from 'src/dto/category';
import { CategoryService } from 'src/services/category/category.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiResponse } from '@nestjs/swagger';
import { ProductsService } from 'src/services/products/products.service';

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly productsService: ProductsService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('cover_photo', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const filename = `${Date.now()}${extname(file.originalname)}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async create(
    @Body() categoryDto: CategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      categoryDto.cover_photo = file.filename;
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
        destination: './uploads',
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
      updateCategoryDto.cover_photo = file.filename; 
    }
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  async deleteCategory(
    @Param('id') categoryId: string,
    @Query('forceDelete') forceDelete: string,
  ): Promise<string> {
    const category = await this.categoryService.findOne(categoryId);
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const products = await this.productsService.findByCategory(categoryId);

    if (products.length > 0) {
      if (forceDelete === 'true') {
        for (const product of products) {
          await this.productsService.remove(product._id);
        }
        await this.categoryService.delete(categoryId);

        return `Category and its ${products.length} products have been deleted.`;
      } else {
        return 'Category contains products. Set forceDelete=true to delete both category and its products.';
      }
    }
    await this.categoryService.delete(categoryId);
    return 'Category deleted successfully (no products in the category).';
  }
}
