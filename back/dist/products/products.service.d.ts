import { OnApplicationBootstrap } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoriesService } from 'src/categories/categories.service';
export declare class ProductsService implements OnApplicationBootstrap {
    private readonly productsRepository;
    private readonly categoriesService;
    constructor(productsRepository: ProductsRepository, categoriesService: CategoriesService);
    onApplicationBootstrap(): Promise<void>;
    create(): Promise<string>;
    findAll(page: any, limit: any): Promise<import("./entities/product.entity").Products[]>;
    findOne(id: string): Promise<import("./entities/product.entity").Products>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<import("./entities/product.entity").Products>;
}
