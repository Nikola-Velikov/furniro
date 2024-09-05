import { Controller, Get, Post, Body, Param, Delete, Put, UploadedFiles, UseInterceptors, UploadedFile, Query, BadRequestException, NotFoundException } from '@nestjs/common';
import { ProductsService } from 'src/services/products/products.service';
import { CategoryService } from 'src/services/category/category.service';
import { Product } from 'src/interfaces/product.interface';
import { ProductDTO } from 'src/dto/product';
import { ApiResponse } from '@nestjs/swagger';
import * as path from 'path';
import * as multer from 'multer';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Types } from 'mongoose';

@Controller('products') 
export class ProductsController {
  constructor(private readonly productsService: ProductsService, private categoryService: CategoryService) {}
  
  @ApiResponse({
    status: 200,
    description: 'List of all products',
    type: ProductDTO,
    
  })
  @Get()
  async findAll(
    @Query('category') category?: string,
    @Query('page') page?: number,  // Optional
    @Query('productNumber') productNumber?: number,  // Optional
    @Query('sortBy') sortBy?: 'name' | 'price' | 'createdAt',  // Sorting field (name, price, or createdAt)
    @Query('sortDirection') sortDirection: 'asc' | 'desc' = 'asc',  // Sorting direction (asc or desc)
  ): Promise<Product[] | string> {
    
    const options: any = {
      sort: {},  // Sorting options
    };

    if (category) {
      if (!Types.ObjectId.isValid(category)) {
        throw new BadRequestException('Invalid category ID!');
      }
  
      // Check if category exists in the database
      const categoryExists = await this.categoryService.findOne(category);
      if (!categoryExists) {
        throw new NotFoundException('Category not found!');
      }
    }
  
    // Handle sorting if provided
    if (sortBy) {
      const direction = sortDirection === 'desc' ? -1 : 1;
      options.sort[sortBy] = direction;  // Sort by field and direction
    }
  
    // If page or productNumber is provided, apply pagination
    if (page && productNumber) {
      options.page = Math.max(page, 1);  // Ensure page is at least 1
      options.limit = Math.max(productNumber, 1);  // Ensure at least 1 product
    }
  
    // If category is provided, fetch products by category
    if (category) {
      if (!page && !productNumber) {
        // If only category is provided (no pagination), return all products in the category
        return this.productsService.findByCategory(category, options.sort);
      }
      // If both category and pagination are provided
      return this.productsService.findPaginatedByCategory(category, options);
    }
  
    // If no pagination is provided, return all products
    if (!page && !productNumber) {
      return this.productsService.findAll(options.sort);  // No pagination
    }
  
    // If pagination is provided without a category, return paginated products
    return this.productsService.findPaginated(options);
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
