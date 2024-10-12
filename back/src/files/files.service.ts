import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FilesRepository } from './files.repository';
import { ProductsRepository } from 'src/products/products.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {
  constructor(
    private readonly filesRepository: FilesRepository,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}
  async uploadFile(file, product_id) {
    const product = await this.productsRepository.findOneBy({ product_id });
    if (!product) throw new NotFoundException('Product not found');

    const uploadedImage = await this.filesRepository.uploadFile(file);

    await this.productsRepository.update(product_id, {
      imgUrl: uploadedImage.secure_url,
    });

    const updatedProduct = await this.productsRepository.findOneBy({
      product_id,
    });

    return updatedProduct;
  }
}
