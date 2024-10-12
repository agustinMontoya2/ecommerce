import { OrderDetails } from 'src/orders/entities/orderDetails.entity';
import { Categories } from './categories.entity';
export declare class Products {
    product_id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    imgUrl: string;
    category: Categories;
    orderDetails: OrderDetails[];
}
