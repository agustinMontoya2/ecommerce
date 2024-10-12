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
exports.OrderRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const orders_entity_1 = require("./entities/orders.entity");
const orderDetails_entity_1 = require("./entities/orderDetails.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../Users/entities/user.entity");
const product_entity_1 = require("../products/entities/product.entity");
const class_validator_1 = require("class-validator");
let OrderRepository = class OrderRepository {
    constructor(ordersRepository, orderDetailRepository, userRepository, productRepository) {
        this.ordersRepository = ordersRepository;
        this.orderDetailRepository = orderDetailRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }
    async getOrder(order_id) {
        const order = await this.ordersRepository.findOne({
            where: { order_id },
            relations: {
                orderDetails: { products: true },
            },
        });
        if (!order)
            throw new common_1.NotFoundException(`Order with id ${order_id} not found`);
        return order;
    }
    async addOrder(user_id, products) {
        let totalPrice = 0;
        let uniqueProducts = [];
        products.forEach((product) => {
            if (!(0, class_validator_1.isUUID)(product.product_id))
                throw new common_1.BadRequestException(`${product.product_id} is not a valid id`);
            if (!uniqueProducts.some((prod) => prod.product_id === product.product_id)) {
                uniqueProducts.push(product);
            }
        });
        const user = await this.userRepository.findOneBy({ user_id });
        if (!user)
            throw new common_1.NotFoundException(`User with id ${user_id} not found`);
        const productsArray = await Promise.all(uniqueProducts.map(async (productItem) => {
            const product = await this.productRepository.findOneBy({
                product_id: productItem.product_id,
            });
            if (!product)
                throw new common_1.NotFoundException(`Product with id ${productItem.product_id} not found`);
            if (product.stock <= 0)
                throw new common_1.BadRequestException('Product without stock');
            totalPrice += Number(product.price);
            await this.productRepository.update({ product_id: product.product_id }, { stock: product.stock - 1 });
            return product;
        }));
        const order = new orders_entity_1.Orders();
        order.date = new Date();
        order.user = user;
        const newOrder = await this.ordersRepository.save(order);
        const orderDetail = new orderDetails_entity_1.OrderDetails();
        orderDetail.price = Number(Number(totalPrice).toFixed(2));
        orderDetail.order = newOrder;
        orderDetail.products = productsArray;
        await this.orderDetailRepository.save(orderDetail);
        return await this.ordersRepository.find({
            where: { order_id: newOrder.order_id },
            relations: {
                orderDetails: true,
            },
        });
    }
    async deleteOrder(order) {
        console.log(order.orderDetails);
        order.orderDetails.products.forEach(async (product) => {
            await this.productRepository.update(product.product_id, {
                stock: product.stock + 1,
            });
        });
        return await this.ordersRepository.remove(order);
    }
};
exports.OrderRepository = OrderRepository;
exports.OrderRepository = OrderRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(orders_entity_1.Orders)),
    __param(1, (0, typeorm_1.InjectRepository)(orderDetails_entity_1.OrderDetails)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(product_entity_1.Products)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrderRepository);
//# sourceMappingURL=orders.repository.js.map