import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from 'src/Users/dto/create-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    signIn(loginUserDto: LoginUserDto): Promise<"Missing required fields" | {
        message: string;
        token: string;
    } | {
        message: string;
        token?: undefined;
    }>;
}
