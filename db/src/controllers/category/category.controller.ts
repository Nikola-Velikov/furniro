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
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductsService } from 'src/services/products/products.service';
import { ValidateObjectIdPipe } from 'src/pipes/validate-object-id.pipe';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly productsService: ProductsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiBody({ type: CategoryDto, description: 'Category details' })
  @ApiResponse({ status: 201, description: 'Category created successfully', type: CategoryDto })
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

  @ApiOperation({ summary: 'Retrieve all categories' })
  @ApiResponse({ status: 200, description: 'List of all categories', type: [CategoryDto] })
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get category by ID' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiResponse({ status: 200, description: 'Category found', type: CategoryDto })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async findOne(@Param('id', ValidateObjectIdPipe) id: string): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a category by ID' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiBody({ type: CategoryDto, description: 'Updated category details' })
  @ApiResponse({ status: 200, description: 'Category updated successfully', type: CategoryDto })
  @ApiResponse({ status: 404, description: 'Category not found' })
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
    @Param('id', ValidateObjectIdPipe) id: string,
    @Body() updateCategoryDto: CategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Category> {
    if (file) {
      updateCategoryDto.cover_photo = file.filename; 
    }
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category by ID' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiQuery({ name: 'forceDelete', required: false, type: 'string', description: 'Set true to force delete the category and its products' })
  @ApiResponse({ status: 200, description: 'Category deleted successfully' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async deleteCategory(
    @Param('id', ValidateObjectIdPipe) categoryId: string,
    @Query('forceDelete') forceDelete: string,
  ): Promise<string> {
    const category = await this.categoryService.findOne(categoryId);
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const products = await this.productsService.findByCategory(categoryId);

    if (products.products.length > 0) {
      if (forceDelete === 'true') {
        for (const product of products.products) {
          await this.productsService.remove(product._id);
        }
        await this.categoryService.delete(categoryId);

        return `Category and its ${products.products.length} products have been deleted.`;
      } else {
        return 'Category contains products. Set forceDelete=true to delete both category and its products.';
      }
    }
    await this.categoryService.delete(categoryId);
    return 'Category deleted successfully (no products in the category).';
  }
}
