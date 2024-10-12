export declare class CreateUserDto {
    name: string;
    isAdmin: boolean;
    email: string;
    password: string;
    confirmPassword: string;
    address: string;
    phone: number;
    country?: string;
    city?: string;
}
export declare enum Role {
    User = "user",
    Admin = "admin",
    superAdmin = "superAdmin"
}
declare const LoginUserDto_base: import("@nestjs/common").Type<Pick<CreateUserDto, "email" | "password">>;
export declare class LoginUserDto extends LoginUserDto_base {
}
export {};
