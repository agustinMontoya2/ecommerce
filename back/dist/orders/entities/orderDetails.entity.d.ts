import { Orders } from './orders.entity';
import { Products } from 'src/products/entities/product.entity';
export declare class OrderDetails {
    orderdetail_id: string;
    price: number;
    order: Orders;
    products: Products[];
}
