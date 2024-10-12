import { Orders } from '../../orders/entities/orders.entity';
export declare class User {
    user_id: string;
    isAdmin: boolean;
    email: string;
    name: string;
    password: string;
    address: string;
    phone: number;
    country: string;
    city: string;
    orders: Orders[];
}
