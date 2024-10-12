import { FilesService } from './files.service';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    uploadFile(file: Express.Multer.File, product_id: string): Promise<import("../products/entities/product.entity").Products>;
}
