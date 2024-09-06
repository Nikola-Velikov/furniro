import { Category } from 'src/interfaces/category.interface';
import { CategoryDto } from 'src/dto/category';
import { CategoryService } from 'src/services/category/category.service';
import { ProductsService } from 'src/services/products/products.service';
export declare class CategoryController {
    private readonly categoryService;
    private readonly productsService;
    constructor(categoryService: CategoryService, productsService: ProductsService);
    create(categoryDto: CategoryDto, file: Express.Multer.File): Promise<Category>;
    findAll(): Promise<Category[]>;
    findOne(id: string): Promise<Category>;
    update(id: string, updateCategoryDto: CategoryDto, file: Express.Multer.File): Promise<Category>;
    deleteCategory(categoryId: string, forceDelete: string): Promise<string>;
}
