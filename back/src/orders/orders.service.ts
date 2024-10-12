import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrderRepository) {}

  addorders(createOrderDto: CreateOrderDto) {
    const { userId, products } = createOrderDto;

    return this.ordersRepository.addOrder(userId, products);
  }
  getorder(id: string) {
    return this.ordersRepository.getOrder(id);
  }
  async deleteOrder(order_id: string) {
    const order = await this.getorder(order_id);
    if (!order)
      throw new NotFoundException(`Order whit id: ${order_id} not found`);

    return this.ordersRepository.deleteOrder(order);
  }
}
