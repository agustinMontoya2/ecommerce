"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const logger_midleware_1 = require("./middlewares/logger.midleware");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(logger_midleware_1.LoggerMiddleware);
    app.useGlobalPipes(new common_1.ValidationPipe());
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('E-commerce API')
        .setDescription('API for managing an e-commerce platform, including products, users, orders, and authentication. The platform supports JSON Web Token (JWT) authentication and Cloudinary image uploads.')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('ecommerce', app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map