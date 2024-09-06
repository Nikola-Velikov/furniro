import { ProductsService } from 'src/services/products/products.service';
import { CategoryService } from 'src/services/category/category.service';
import { Product } from 'src/interfaces/product.interface';
import { ProductDTO } from 'src/dto/product';
import { TotalProducts } from 'src/interfaces/totalProducts.interface';
export declare class ProductsController {
    private readonly productsService;
    private categoryService;
    constructor(productsService: ProductsService, categoryService: CategoryService);
    findAll(category?: string, page?: number, productNumber?: number, sortBy?: 'name' | 'price' | 'createdAt', sortDirection?: 'asc' | 'desc'): Promise<Product[] | string | TotalProducts>;
    findOne(id: string): Promise<Product | null>;
    create(productDto: ProductDTO, files: {
        cover_photo?: Express.Multer.File[];
        additional_photos?: Express.Multer.File[];
    }): Promise<Product>;
    update(id: string, productDto: ProductDTO, files: {
        cover_photo?: Express.Multer.File[];
        additional_photos?: Express.Multer.File[];
    }): Promise<Product | null>;
    remove(id: string): Promise<Product | null>;
}
