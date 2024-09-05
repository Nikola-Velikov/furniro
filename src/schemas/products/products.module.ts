import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from 'src/controllers/products/products.controller';
import { ProductsService } from 'src/services/products/products.service';
import { ProductSchema } from './products';
import { CategoryModule } from '../category/category.module';
import { ReviewModule } from '../reviews/reviews.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    CategoryModule,
    forwardRef(() => ReviewModule)
  
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductsModule {}
