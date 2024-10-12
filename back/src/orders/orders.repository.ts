import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from './entities/orders.entity';
import { OrderDetails } from './entities/orderDetails.entity';
import { Repository } from 'typeorm';
import { User } from 'src/Users/entities/user.entity';
import { Products } from 'src/products/entities/product.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
    @InjectRepository(OrderDetails)
    private orderDetailRepository: Repository<OrderDetails>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Products)
    private productRepository: Repository<Products>,
  ) {}

  async getOrder(order_id: string) {
    const order: Orders = await this.ordersRepository.findOne({
      where: { order_id },
      relations: {
        orderDetails: { products: true },
      },
    });
    if (!order)
      throw new NotFoundException(`Order with id ${order_id} not found`);

    return order;
  }

  async addOrder(user_id: string, products: { product_id }[]) {
    let totalPrice = 0;
    let uniqueProducts = [];
    products.forEach((product) => {
      if (!isUUID(product.product_id))
        throw new BadRequestException(
          `${product.product_id} is not a valid id`,
        );

      if (
        !uniqueProducts.some((prod) => prod.product_id === product.product_id)
      ) {
        uniqueProducts.push(product);
      }
    });
    //* find user by id
    const user: User = await this.userRepository.findOneBy({ user_id });
    if (!user) throw new NotFoundException(`User with id ${user_id} not found`);

    //*find products and calculate total price
    const productsArray: Products[] = await Promise.all(
      uniqueProducts.map(async (productItem) => {
        const product: Products = await this.productRepository.findOneBy({
          product_id: productItem.product_id,
        });
        if (!product)
          throw new NotFoundException(
            `Product with id ${productItem.product_id} not found`,
          );
        if (product.stock <= 0)
          throw new BadRequestException('Product without stock');
        totalPrice += Number(product.price);
        await this.productRepository.update(
          { product_id: product.product_id },
          { stock: product.stock - 1 },
        );
        return product;
      }),
    );

    //* create order
    const order: Orders = new Orders();
    order.date = new Date();
    order.user = user;
    const newOrder = await this.ordersRepository.save(order);

    //* create and save orderDetail
    const orderDetail: OrderDetails = new OrderDetails();
    orderDetail.price = Number(Number(totalPrice).toFixed(2));
    orderDetail.order = newOrder;
    orderDetail.products = productsArray;
    await this.orderDetailRepository.save(orderDetail);

    return await this.ordersRepository.find({
      where: { order_id: newOrder.order_id },
      relations: {
        orderDetails: true,
      },
    });
  }
  async deleteOrder(order: Orders) {
    console.log(order.orderDetails);
    order.orderDetails.products.forEach(async (product) => {
      await this.productRepository.update(product.product_id, {
        stock: product.stock + 1,
      });
    });
    return await this.ordersRepository.remove(order);
  }
}
