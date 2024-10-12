import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  create(createUserDto: CreateUserDto) {
    return this.usersRepository.createUser(createUserDto);
  }

  findAll(page: number, limit: number) {
    return this.usersRepository.getUsers(page, limit);
  }

  findOne(id: string) {
    return this.usersRepository.getUserById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    let {
      email,
      name,
      address,
      phone,
      country,
      city,
      password,
      confirmPassword,
      isAdmin,
    } = updateUserDto;

    return this.usersRepository.updateUser(id, {
      isAdmin,
      email,
      name,
      address,
      phone,
      country,
      city,
      password,
    });
  }

  remove(id: string) {
    return this.usersRepository.deleteUser(id);
  }
}
