import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    addorders(createOrderDto: CreateOrderDto): Promise<import("./entities/orders.entity").Orders[]>;
    getorder(id: string): Promise<import("./entities/orders.entity").Orders>;
    deleteOrder(id: string): Promise<import("./entities/orders.entity").Orders>;
}
