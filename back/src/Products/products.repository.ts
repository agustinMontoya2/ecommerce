import { Injectable, NotFoundException } from '@nestjs/common';
import { Products } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Categories } from './entities/categories.entity';
import * as data from '../utils/Archivo.json';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async getProducts(page, limit) {
    console.log(page, limit);

    const firstIndex = (page - 1) * limit;
    const lastIndex = firstIndex + limit;

    const allProducts = await this.productsRepository.find();

    const products = allProducts.slice(firstIndex, lastIndex);
    return products;
  }

  getProductById(product_id: string) {
    const product = this.productsRepository.findOneBy({ product_id });
    if (!product)
      throw new NotFoundException(`Product with id ${product_id} not found`);
    return product;
  }

  async addProduct() {
    console.log('adding products');

    //*find categories and create product
    const categories = await this.categoriesRepository.find();

    data?.map(async (element) => {
      const category = categories.find(
        (category) => category.name === element.category,
      );

      const product = new Products();
      product.name = element.name;
      product.description = element.description;
      product.price = element.price;
      product.stock = element.stock;
      product.imgUrl =
        element.imgUrl.length !== 0
          ? element.imgUrl
          : 'https://res.cloudinary.com/dxpxzcj2i/image/upload/v1724243935/gvmpxhbyz3rvdsvnhvhm.webp';
      product.category = category;

      await this.productsRepository
        .createQueryBuilder()
        .insert()
        .into(Products)
        .values(product)
        .orUpdate(['description', 'price'], ['name'])
        .execute();
    });
    return 'Products added';
  }

  async updateProduct(product_id: string, product) {
    await this.productsRepository.update(product_id, product);
    const updatedProduct = await this.productsRepository.findOneBy({
      product_id,
    });
    return updatedProduct;
  }
}
