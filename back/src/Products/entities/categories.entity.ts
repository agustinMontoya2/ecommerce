import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Products } from './product.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity({ name: 'categories' })
export class Categories {
  @ApiHideProperty()
  @PrimaryGeneratedColumn('uuid')
  category_id: string;

  /**
   * The name of the category
   * @example "smartphone"
   */
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name: string;

  @OneToMany(() => Products, (product) => product.category)
  @JoinColumn()
  product: Products[];
}
