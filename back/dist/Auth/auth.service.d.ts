import { CreateUserDto } from 'src/Users/dto/create-user.dto';
import { UsersRepository } from 'src/Users/users.repository';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: UsersRepository, jwtService: JwtService);
    signIn(email: any, password: any): Promise<"Missing required fields" | {
        message: string;
        token: string;
    } | {
        message: string;
        token?: undefined;
    }>;
    signUp(createUserDto: CreateUserDto): Promise<{
        user_id: string;
        email: string;
        name: string;
        address: string;
        phone: number;
        country: string;
        city: string;
        orders: import("../orders/entities/orders.entity").Orders[];
    }>;
}
