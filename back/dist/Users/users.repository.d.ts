import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersRepository {
    private userRepository;
    constructor(userRepository: Repository<User>);
    getUsers(page: number, limit: number): Promise<{
        user_id: string;
        isAdmin: boolean;
        email: string;
        name: string;
        address: string;
        phone: number;
        country: string;
        city: string;
        orders: import("../orders/entities/orders.entity").Orders[];
    }[]>;
    getUserById(user_id: string): Promise<{
        user_id: string;
        email: string;
        name: string;
        address: string;
        phone: number;
        country: string;
        city: string;
        orders: import("../orders/entities/orders.entity").Orders[];
    }>;
    getUserByEmail(email: string): Promise<User>;
    createUser(user: CreateUserDto): Promise<{
        user_id: string;
        email: string;
        name: string;
        address: string;
        phone: number;
        country: string;
        city: string;
        orders: import("../orders/entities/orders.entity").Orders[];
    }>;
    updateUser(user_id: string, user: UpdateUserDto): Promise<{
        name: string;
        email: string;
        confirmPassword?: string;
        address: string;
        phone: number;
        country: string;
        city: string;
        user_id: string;
        orders: import("../orders/entities/orders.entity").Orders[];
    }>;
    deleteUser(user_id: string): Promise<User>;
}
