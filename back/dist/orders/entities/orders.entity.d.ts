import { User } from '../../Users/entities/user.entity';
import { OrderDetails } from './orderDetails.entity';
export declare class Orders {
    order_id: string;
    date: Date;
    orderDetails: OrderDetails;
    user: User;
}
