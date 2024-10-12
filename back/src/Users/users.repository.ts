import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUsers(page: number, limit: number) {
    const firstIndex = (page - 1) * limit;
    const lastIndex = firstIndex + limit;

    const allUsers: User[] = await this.userRepository.find();
    const usersPage = allUsers.slice(firstIndex, lastIndex);

    const usersWithoutPassword = usersPage.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    return usersWithoutPassword;
  }

  async getUserById(user_id: string) {
    const user = await this.userRepository.findOne({
      where: { user_id },
      relations: { orders: { orderDetails: true } },
    });
    if (!user) throw new NotFoundException(`User with id ${user_id} not found`);
    const { password, isAdmin, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async createUser(user: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    if (!hashedPassword)
      throw new BadRequestException('error, please try again');

    const newUser = this.userRepository.create(user);
    newUser.password = hashedPassword;
    this.userRepository.save(newUser);

    const { password, isAdmin, ...userWithoutPassword } = newUser;

    return userWithoutPassword;
  }

  async updateUser(user_id: string, user: UpdateUserDto) {
    console.log(user);

    const userFind = await this.userRepository.findOne({ where: { user_id } });
    if (userFind) {
      const updatedUser = { ...userFind, ...user };
      this.userRepository.update(user_id, updatedUser);
      const { password, isAdmin, ...userWithoutPassword } = updatedUser;
      return userWithoutPassword;
    }

    throw new NotFoundException(`User with id ${user_id} not found`);
  }

  async deleteUser(user_id: string) {
    const deletedUser = await this.userRepository.findOne({
      where: { user_id },
    });
    if (!deletedUser)
      throw new NotFoundException(`User whith id ${user_id} not found`);
    this.userRepository.remove(deletedUser);
    return deletedUser;
  }
}
