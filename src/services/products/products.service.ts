import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDTO } from 'src/dto/product';
import { Product } from 'src/interfaces/product.interface';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

  create(product: ProductDTO): Promise<Product> {
    const createdProduct = new this.productModel(product);
    return createdProduct.save();
  }

  async findAll(sort: any): Promise<Product[]> {
    return this.productModel
      .find()
      .sort(sort)  // Apply sorting if any
      .populate('category')
      .exec();
  }

  findOne(id: string): Promise<Product | null> {
    return this.productModel.findById(id).exec();
  }

  update(id: string, product: ProductDTO): Promise<Product | null> {
    return this.productModel.findByIdAndUpdate(id, product, { new: true }).exec();
  }

  remove(id: string): Promise<Product | null> {
    return this.productModel.findByIdAndDelete(id).exec();
  }

  async findByCategory(categoryId: string, sort: any): Promise<Product[]> {
    return this.productModel
      .find({ category: categoryId })
      .sort(sort)  // Apply sorting if any
      .populate('category')
      .exec();
  }

  // Pagination without category filter
  async findPaginated(options: any): Promise<Product[]> {
    return this.productModel
      .find()
      .sort(options.sort)
      .skip((options.page - 1) * options.limit)
      .limit(options.limit)
      .populate('category')
      .exec();
  }

  // Pagination with category filter
  async findPaginatedByCategory(categoryId: string, options: any): Promise<Product[]> {
    return this.productModel
      .find({ category: categoryId })
      .sort(options.sort)  // Apply sorting
      .skip((options.page - 1) * options.limit)
      .limit(options.limit)
      .populate('category')
      .exec();
  }

}
