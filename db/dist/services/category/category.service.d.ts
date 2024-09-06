import { Model } from 'mongoose';
import { CategoryDto } from 'src/dto/category';
import { Category } from 'src/interfaces/category.interface';
export declare class CategoryService {
    private readonly categoryModel;
    constructor(categoryModel: Model<Category>);
    create(createCategoryDto: CategoryDto): Promise<Category>;
    findAll(): Promise<Category[]>;
    findOne(id: string): Promise<Category>;
    update(id: string, updateCategoryDto: CategoryDto): Promise<Category>;
    delete(id: string): Promise<void>;
}
