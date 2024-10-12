import {
  BadRequestException,
  Injectable,
  OnApplicationBootstrap,
  OnModuleInit,
} from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class ProductsService implements OnApplicationBootstrap {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly categoriesService: CategoriesService,
  ) {}

  async onApplicationBootstrap() {
    await this.categoriesService.addCategories();
    await this.create();
  }
  create() {
    return this.productsRepository.addProduct();
  }

  findAll(page, limit) {
    return this.productsRepository.getProducts(page, limit);
  }

  findOne(id: string) {
    return this.productsRepository.getProductById(id);
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    if (!updateProductDto)
      throw new BadRequestException(
        'The body must contain at least one valid property',
      );

    return this.productsRepository.updateProduct(id, updateProductDto);
  }
}
