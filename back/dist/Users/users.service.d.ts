import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    create(createUserDto: CreateUserDto): Promise<{
        user_id: string;
        email: string;
        name: string;
        address: string;
        phone: number;
        country: string;
        city: string;
        orders: import("../orders/entities/orders.entity").Orders[];
    }>;
    findAll(page: number, limit: number): Promise<{
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
    findOne(id: string): Promise<{
        user_id: string;
        email: string;
        name: string;
        address: string;
        phone: number;
        country: string;
        city: string;
        orders: import("../orders/entities/orders.entity").Orders[];
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
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
    remove(id: string): Promise<import("./entities/user.entity").User>;
}
