import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(): Promise<string>;
    findAll(page?: number, limit?: number): Promise<import("./entities/product.entity").Products[]>;
    findOne(id: string): Promise<import("./entities/product.entity").Products>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<import("./entities/product.entity").Products>;
}
