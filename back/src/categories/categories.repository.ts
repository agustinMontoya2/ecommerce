import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/products/entities/categories.entity';
import { Repository } from 'typeorm';
import * as data from '../utils/Archivo.json';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async addCategories(): Promise<string> {
    data?.map(async (element) => {
      await this.categoriesRepository
        .createQueryBuilder()
        .insert()
        .into(Categories)
        .values({ name: element.category })
        .orIgnore()
        .execute();
    });

    return 'Categories added';
  }
  getCategories() {
    return this.categoriesRepository.find();
  }
}
