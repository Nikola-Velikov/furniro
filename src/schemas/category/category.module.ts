import { MongooseModule } from '@nestjs/mongoose';
import { CategoryController } from 'src/controllers/category/category.controller';
import { CategoryService } from 'src/services/category/category.service';
import { CategorySchema } from './category';
import { forwardRef, Module } from '@nestjs/common';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
    forwardRef(() => ProductsModule)
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService]
  
})
export class CategoryModule {}