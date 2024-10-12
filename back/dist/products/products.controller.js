"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const products_guard_1 = require("../guards/products.guard");
const AuthGuard_guard_1 = require("../Auth/AuthGuard.guard");
const create_user_dto_1 = require("../Users/dto/create-user.dto");
const roles_decorator_1 = require("../custom-validators/roles.decorator");
const roles_guard_1 = require("../guards/roles.guard");
const swagger_1 = require("@nestjs/swagger");
const update_product_dto_1 = require("./dto/update-product.dto");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    create() {
        return this.productsService.create();
    }
    findAll(page = 1, limit = 5) {
        return this.productsService.findAll(page, limit);
    }
    findOne(id) {
        return this.productsService.findOne(id);
    }
    update(id, updateProductDto) {
        const { name, description, price, stock, imgUrl } = updateProductDto;
        console.log(updateProductDto);
        return this.productsService.update(id, {
            name,
            description,
            price,
            stock,
            imgUrl,
        });
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: String }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiQuery)({ name: 'page', type: Number, required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limit', type: Number, required: false }),
    openapi.ApiResponse({ status: 200, type: [require("./entities/product.entity").Products] }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/product.entity").Products }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)(create_user_dto_1.Role.Admin),
    (0, common_1.UseGuards)(products_guard_1.BodyProductsGuard, AuthGuard_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    openapi.ApiResponse({ status: 200, type: require("./entities/product.entity").Products }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "update", null);
exports.ProductsController = ProductsController = __decorate([
    (0, swagger_1.ApiTags)('products'),
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map