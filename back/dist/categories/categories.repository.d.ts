import { Categories } from 'src/products/entities/categories.entity';
import { Repository } from 'typeorm';
export declare class CategoriesRepository {
    private categoriesRepository;
    constructor(categoriesRepository: Repository<Categories>);
    addCategories(): Promise<string>;
    getCategories(): Promise<Categories[]>;
}
