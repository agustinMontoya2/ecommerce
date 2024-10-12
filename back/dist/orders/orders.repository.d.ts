import { Orders } from './entities/orders.entity';
import { OrderDetails } from './entities/orderDetails.entity';
import { Repository } from 'typeorm';
import { User } from 'src/Users/entities/user.entity';
import { Products } from 'src/products/entities/product.entity';
export declare class OrderRepository {
    private ordersRepository;
    private orderDetailRepository;
    private userRepository;
    private productRepository;
    constructor(ordersRepository: Repository<Orders>, orderDetailRepository: Repository<OrderDetails>, userRepository: Repository<User>, productRepository: Repository<Products>);
    getOrder(order_id: string): Promise<Orders>;
    addOrder(user_id: string, products: {
        product_id: any;
    }[]): Promise<Orders[]>;
    deleteOrder(order: Orders): Promise<Orders>;
}
