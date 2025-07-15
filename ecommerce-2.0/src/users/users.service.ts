import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAllUsers(page: number, limit: number) {
    return await this.usersRepository.getUsers(page, limit);
  }

  async getUserById(id: string) {
    if (!id) throw new BadRequestException('id is required');
    const user = await this.usersRepository.getUserById(id);
    if (!user) throw new BadRequestException('user not found');
    return user;
  }

  async updateUser(id: string, user: Partial<UpdateUserDto>) {
    const userToUpdate = await this.getUserById(id);
    if (user.email && (await this.usersRepository.getUserByEmail(user.email)))
      throw new ConflictException('email already exists');

    const newUser = await this.usersRepository.mergeUser(userToUpdate, user);
    const savedUser = await this.usersRepository.saveUser(newUser);

    return { ...savedUser, password: undefined };
  }
}
