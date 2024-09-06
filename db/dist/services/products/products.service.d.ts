import { Model } from 'mongoose';
import { ProductDTO } from 'src/dto/product';
import { Product } from 'src/interfaces/product.interface';
import { ReviewService } from '../reviews/reviews.service';
import { TotalProducts } from 'src/interfaces/totalProducts.interface';
import { SortOptions } from 'src/interfaces/sortOptions.interface';
export declare class ProductsService {
    private readonly productModel;
    private readonly reviewService;
    constructor(productModel: Model<Product>, reviewService: ReviewService);
    getProductCount(category?: string): Promise<number>;
    create(product: ProductDTO): Promise<Product>;
    findAll(sort: string): Promise<TotalProducts>;
    findOne(id: string): Promise<any | null>;
    update(id: string, product: ProductDTO): Promise<Product | null>;
    remove(id: string): Promise<Product | null>;
    findByCategory(categoryId: string, sort?: string): Promise<TotalProducts>;
    deleteByCategory(categoryId: string): Promise<void>;
    findPaginated(options: SortOptions): Promise<TotalProducts>;
    findPaginatedByCategory(categoryId: string, options: SortOptions): Promise<TotalProducts>;
}
