import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    addCategories(): Promise<string>;
    getCategories(): Promise<import("../products/entities/categories.entity").Categories[]>;
}
