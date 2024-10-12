import { CategoriesRepository } from './categories.repository';
export declare class CategoriesService {
    private readonly categoriesRepository;
    constructor(categoriesRepository: CategoriesRepository);
    getCategories(): Promise<import("../products/entities/categories.entity").Categories[]>;
    addCategories(): Promise<string>;
}
