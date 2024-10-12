import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  LoginUserDto,
  Role,
} from 'src/Users/dto/create-user.dto';
import { UsersRepository } from 'src/Users/users.repository';
import * as bctypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import e from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email, password) {
    if (!email || !password) {
      return 'Missing required fields';
    }
    const user = await this.userRepository.getUserByEmail(email);
    if (user) {
      const validPassword = await bctypt.compare(password, user.password);
      if (validPassword) {
        const userPayload = {
          id: user.user_id,
          email: user.email,
          role: user.isAdmin ? Role.Admin : Role.User,
        };
        const token = this.jwtService.sign(userPayload);
        return { message: 'Welcome', token: token };
      }
    }
    return { message: 'Invalid credentials' };
  }

  async signUp(createUserDto: CreateUserDto) {
    const user = await this.userRepository.getUserByEmail(createUserDto.email);

    if (user) throw new BadRequestException('email already exists');
    return this.userRepository.createUser(createUserDto);
  }
}
