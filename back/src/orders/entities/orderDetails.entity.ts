import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Orders } from './orders.entity';
import { Products } from 'src/products/entities/product.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity({ name: 'orderdetails' })
export class OrderDetails {
  @ApiHideProperty()
  @PrimaryGeneratedColumn('uuid')
  orderdetail_id: string;

  /**
   * Price of the product
   * @example 199.99
   */
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @OneToOne(() => Orders, (order) => order.orderDetails, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order: Orders;

  @ManyToMany(() => Products)
  @JoinTable({
    name: 'orderdetails_products',
    joinColumn: {
      name: 'orderdetail_id',
      referencedColumnName: 'orderdetail_id',
    },
    inverseJoinColumn: {
      name: 'product_id',
      referencedColumnName: 'product_id',
    },
  })
  products: Products[];
}
