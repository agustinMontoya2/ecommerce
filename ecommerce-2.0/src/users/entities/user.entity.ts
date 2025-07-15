import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { Orders } from '../../orders/entities/orders.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class User {
  @ApiHideProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiHideProperty()
  @Column({ type: 'varchar', length: 15, default: 'user' })
  role: string;

  /**
   * email should be unique and not null
   * @example mail@example.com
   */
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  email: string;

  /**
   * name should not be null
   * @example John Doe
   */
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  /**
   * password should not be null
   * @example Password123!
   */
  @Column({ type: 'varchar', length: 128, nullable: false })
  password: string;

  /**
   * addres of the user
   * @example 123 Main Street
   */
  @Column({ type: 'text', nullable: true })
  address: string;

  /**
   * phone number of the user
   * @example 123456789
   */
  @Column({ type: 'int', nullable: true })
  phone: number;

  /**
   * Optional country of the user
   * @example Canada
   */
  @Column({ type: 'varchar', length: 50, nullable: true })
  country: string;

  /**
   * Optional city of the user
   * @example Montreal
   */
  @Column({ type: 'varchar', length: 50, nullable: true })
  city: string;

  //   @OneToMany(() => Orders, (order) => order.user)
  //   @JoinColumn({ name: 'order_id' })
  //   orders: Orders[];
}
