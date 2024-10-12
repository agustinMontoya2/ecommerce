import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../Users/entities/user.entity';
import { OrderDetails } from './orderDetails.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity({ name: 'orders' })
export class Orders {
  @ApiHideProperty()
  @PrimaryGeneratedColumn('uuid')
  order_id: string;

  /**
   * Date of the order
   * @example "2024-01-01"
   */
  @Column()
  date: Date;

  @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order)
  orderDetails: OrderDetails;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
