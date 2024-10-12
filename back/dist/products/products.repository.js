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
exports.ProductsRepository = void 0;
const common_1 = require("@nestjs/common");
const product_entity_1 = require("./entities/product.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const categories_entity_1 = require("./entities/categories.entity");
const data = require("../utils/Archivo.json");
let ProductsRepository = class ProductsRepository {
    constructor(productsRepository, categoriesRepository) {
        this.productsRepository = productsRepository;
        this.categoriesRepository = categoriesRepository;
    }
    async getProducts(page, limit) {
        console.log(page, limit);
        const firstIndex = (page - 1) * limit;
        const lastIndex = firstIndex + limit;
        const allProducts = await this.productsRepository.find();
        const products = allProducts.slice(firstIndex, lastIndex);
        return products;
    }
    getProductById(product_id) {
        const product = this.productsRepository.findOneBy({ product_id });
        if (!product)
            throw new common_1.NotFoundException(`Product with id ${product_id} not found`);
        return product;
    }
    async addProduct() {
        console.log('adding products');
        const categories = await this.categoriesRepository.find();
        data?.map(async (element) => {
            const category = categories.find((category) => category.name === element.category);
            const product = new product_entity_1.Products();
            product.name = element.name;
            product.description = element.description;
            product.price = element.price;
            product.stock = element.stock;
            product.imgUrl =
                element.imgUrl.length !== 0
                    ? element.imgUrl
                    : 'https://res.cloudinary.com/dxpxzcj2i/image/upload/v1724243935/gvmpxhbyz3rvdsvnhvhm.webp';
            product.category = category;
            await this.productsRepository
                .createQueryBuilder()
                .insert()
                .into(product_entity_1.Products)
                .values(product)
                .orUpdate(['description', 'price'], ['name'])
                .execute();
        });
        return 'Products added';
    }
    async updateProduct(product_id, product) {
        await this.productsRepository.update(product_id, product);
        const updatedProduct = await this.productsRepository.findOneBy({
            product_id,
        });
        return updatedProduct;
    }
};
exports.ProductsRepository = ProductsRepository;
exports.ProductsRepository = ProductsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Products)),
    __param(1, (0, typeorm_1.InjectRepository)(categories_entity_1.Categories)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductsRepository);
//# sourceMappingURL=products.repository.js.map