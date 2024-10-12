"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const products_module_1 = require("./products/products.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./Users/users.module");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("./config/typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const categories_module_1 = require("./categories/categories.module");
const orders_module_1 = require("./orders/orders.module");
const files_module_1 = require("./files/files.module");
const jwt_1 = require("@nestjs/jwt");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [typeorm_1.default],
            }),
            typeorm_2.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => configService.get('typeorm'),
            }),
            jwt_1.JwtModule.register({
                global: true,
                signOptions: { expiresIn: '1h' },
                secret: process.env.JWT_SECRET,
            }),
            users_module_1.UsersModule,
            products_module_1.ProductsModule,
            auth_module_1.AuthModule,
            categories_module_1.CategoriesModule,
            orders_module_1.OrdersModule,
            files_module_1.FilesModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map