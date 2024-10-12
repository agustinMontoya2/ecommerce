import { FilesRepository } from './files.repository';
import { Products } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
export declare class FilesService {
    private readonly filesRepository;
    private readonly productsRepository;
    constructor(filesRepository: FilesRepository, productsRepository: Repository<Products>);
    uploadFile(file: any, product_id: any): Promise<Products>;
}
