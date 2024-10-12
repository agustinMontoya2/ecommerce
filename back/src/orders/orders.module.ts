import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderRepository } from './orders.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './entities/orders.entity';
import { OrderDetails } from './entities/orderDetails.entity';
import { Products } from 'src/products/entities/product.entity';
import { User } from 'src/Users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, OrderDetails, Products, User])],
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository],
})
export class OrdersModule {}
