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
exports.UsersRepository = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
let UsersRepository = class UsersRepository {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getUsers(page, limit) {
        const firstIndex = (page - 1) * limit;
        const lastIndex = firstIndex + limit;
        const allUsers = await this.userRepository.find();
        const usersPage = allUsers.slice(firstIndex, lastIndex);
        const usersWithoutPassword = usersPage.map((user) => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });
        return usersWithoutPassword;
    }
    async getUserById(user_id) {
        const user = await this.userRepository.findOne({
            where: { user_id },
            relations: { orders: { orderDetails: true } },
        });
        if (!user)
            throw new common_1.NotFoundException(`User with id ${user_id} not found`);
        const { password, isAdmin, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async getUserByEmail(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        return user;
    }
    async createUser(user) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        if (!hashedPassword)
            throw new common_1.BadRequestException('error, please try again');
        const newUser = this.userRepository.create(user);
        newUser.password = hashedPassword;
        this.userRepository.save(newUser);
        const { password, isAdmin, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    }
    async updateUser(user_id, user) {
        console.log(user);
        const userFind = await this.userRepository.findOne({ where: { user_id } });
        if (userFind) {
            const updatedUser = { ...userFind, ...user };
            this.userRepository.update(user_id, updatedUser);
            const { password, isAdmin, ...userWithoutPassword } = updatedUser;
            return userWithoutPassword;
        }
        throw new common_1.NotFoundException(`User with id ${user_id} not found`);
    }
    async deleteUser(user_id) {
        const deletedUser = await this.userRepository.findOne({
            where: { user_id },
        });
        if (!deletedUser)
            throw new common_1.NotFoundException(`User whith id ${user_id} not found`);
        this.userRepository.remove(deletedUser);
        return deletedUser;
    }
};
exports.UsersRepository = UsersRepository;
exports.UsersRepository = UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersRepository);
//# sourceMappingURL=users.repository.js.map