import { CreateOrderDto } from './dto/create-order.dto';
import { OrderRepository } from './orders.repository';
export declare class OrdersService {
    private readonly ordersRepository;
    constructor(ordersRepository: OrderRepository);
    addorders(createOrderDto: CreateOrderDto): Promise<import("./entities/orders.entity").Orders[]>;
    getorder(id: string): Promise<import("./entities/orders.entity").Orders>;
    deleteOrder(order_id: string): Promise<import("./entities/orders.entity").Orders>;
}
