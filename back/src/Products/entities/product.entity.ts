import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderDetails } from 'src/orders/entities/orderDetails.entity';
import { Categories } from './categories.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity({ name: 'products' })
export class Products {
  @ApiHideProperty()
  @PrimaryGeneratedColumn('uuid')
  product_id: string;

  /**
   * Name of the product
   * @example Iphone 15
   */
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name: string;

  /**
   * Description of the product
   * @example The best smartphone in the world
   */
  @Column({ type: 'text', nullable: false })
  description: string;

  /**
   * Price of the product
   * @example 199.99
   */
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  /**
   * Stock of the product
   * @example 12
   */
  @Column({ type: 'int', nullable: false })
  stock: number;

  /**
   * Image URL of the product
   * @example https://res.cloudinary.com/dxpxzcj2i/image/upload/v1724243935/gvmpxhbyz3rvdsvnhvhm.webp
   */
  @Column({ type: 'text', default: '' })
  imgUrl: string;

  @ManyToOne(() => Categories, (category) => category.product)
  @JoinColumn({ name: 'category_id' })
  category: Categories;

  @ManyToMany(() => OrderDetails, (orderDetail) => orderDetail.products)
  orderDetails: OrderDetails[];
}
