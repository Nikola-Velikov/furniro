import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDTO } from 'src/dto/product';
import { Product } from 'src/interfaces/product.interface';
import { ReviewService } from '../reviews/reviews.service';
import { Review } from 'src/interfaces/review.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    private readonly reviewService: ReviewService, // Inject ReviewService
  ) {}

  create(product: ProductDTO): Promise<Product> {
    const createdProduct = new this.productModel(product);
    return createdProduct.save();
  }

  async findAll(sort: any): Promise<any> {
    const products = await this.productModel
      .find()
      .sort(sort) // Apply sorting if any
      .populate('category')
      .exec();

    const totalProductsCount = products.length;
    const result = {
      products: products,
      totalProductsCount: totalProductsCount,
    };
    return result;
  }

  async findOne(id: string): Promise<any | null> {
    // Fetch the product and populate category
    const product = await this.productModel
      .findById(id)
      .populate('category')
      .exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Fetch reviews for the product
    const reviews = await this.reviewService.findReviewsByProduct(id);
    let avgRating = 0;
    const discountPercent = product.discount || 0;
    const discountedPrice = (
      product.price -
      (product.price * discountPercent) / 100
    ).toFixed(2);

    if (reviews.length > 0) {
      const reviewsCount = reviews.length;
      avgRating =
        reviews.reduce((sum, review) => sum + review.value, 0) / reviewsCount;
    }

    let relatedProducts = [];

    if (product.category) {
      relatedProducts = await this.productModel
        .find({ category: product.category._id, _id: { $ne: id } })
        .limit(4) // Limit to 4 products
        .populate('category')
        .exec();
    }

    return { product, reviews, avgRating, discountedPrice, relatedProducts };
  }

  update(id: string, product: ProductDTO): Promise<Product | null> {
    return this.productModel
      .findByIdAndUpdate(id, product, { new: true })
      .exec();
  }

  remove(id: string): Promise<Product | null> {
    return this.productModel.findByIdAndDelete(id).exec();
  }

  async findByCategory(categoryId: string, sort?: any): Promise<any> {
    const products = await this.productModel
      .find({ category: categoryId })
      .sort(sort) // Apply sorting if any
      .populate('category')
      .exec();
    const totalProductsCount = products.length;
    const result = {
      products: products,
      totalProductsCount: totalProductsCount,
    };
    return result;
  }

  async deleteByCategory(categoryId: string): Promise<void> {
    await this.productModel.deleteMany({ category: categoryId }).exec();
  }

  // Pagination without category filter
  async findPaginated(options: any): Promise<any> {
    const products = await this.productModel
      .find()
      .sort(options.sort)
      .skip((options.page - 1) * options.limit)
      .limit(options.limit)
      .populate('category')
      .exec();

      const totalProductsCount = products.length;
    const result = {
      products: products,
      totalProductsCount: totalProductsCount,
    };
    return result;
  }

  // Pagination with category filter
  async findPaginatedByCategory(
    categoryId: string,
    options: any,
  ): Promise<any> {
    const products = await this.productModel
      .find({ category: categoryId })
      .sort(options.sort) // Apply sorting
      .skip((options.page - 1) * options.limit)
      .limit(options.limit)
      .populate('category')
      .exec();

      const totalProductsCount = products.length;
      const result = {
        products: products,
        totalProductsCount: totalProductsCount,
      };
      return result;
  }
}
