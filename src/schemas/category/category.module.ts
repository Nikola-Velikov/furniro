import { MongooseModule } from '@nestjs/mongoose';
import { CategoryController } from 'src/controllers/category/category.controller';
import { CategoryService } from 'src/services/category/category.service';
import { CategorySchema } from './category';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}