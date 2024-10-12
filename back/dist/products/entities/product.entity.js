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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const orderDetails_entity_1 = require("../../orders/entities/orderDetails.entity");
const categories_entity_1 = require("./categories.entity");
const swagger_1 = require("@nestjs/swagger");
let Products = class Products {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, description: "Name of the product" }, description: { required: true, type: () => String, description: "Description of the product" }, price: { required: true, type: () => Number, description: "Price of the product", example: 199.99 }, stock: { required: true, type: () => Number, description: "Stock of the product", example: 12 }, imgUrl: { required: true, type: () => String, description: "Image URL of the product", example: "https://res.cloudinary.com/dxpxzcj2i/image/upload/v1724243935/gvmpxhbyz3rvdsvnhvhm.webp" }, category: { required: true, type: () => require("./categories.entity").Categories }, orderDetails: { required: true, type: () => [require("../../orders/entities/orderDetails.entity").OrderDetails] } };
    }
};
exports.Products = Products;
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Products.prototype, "product_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: false, unique: true }),
    __metadata("design:type", String)
], Products.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false }),
    __metadata("design:type", String)
], Products.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: false }),
    __metadata("design:type", Number)
], Products.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], Products.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '' }),
    __metadata("design:type", String)
], Products.prototype, "imgUrl", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categories_entity_1.Categories, (category) => category.product),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", categories_entity_1.Categories)
], Products.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => orderDetails_entity_1.OrderDetails, (orderDetail) => orderDetail.products),
    __metadata("design:type", Array)
], Products.prototype, "orderDetails", void 0);
exports.Products = Products = __decorate([
    (0, typeorm_1.Entity)({ name: 'products' })
], Products);
//# sourceMappingURL=product.entity.js.map