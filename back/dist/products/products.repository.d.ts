import { Products } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Categories } from './entities/categories.entity';
export declare class ProductsRepository {
    private productsRepository;
    private categoriesRepository;
    constructor(productsRepository: Repository<Products>, categoriesRepository: Repository<Categories>);
    getProducts(page: any, limit: any): Promise<Products[]>;
    getProductById(product_id: string): Promise<Products>;
    addProduct(): Promise<string>;
    updateProduct(product_id: string, product: any): Promise<Products>;
}
