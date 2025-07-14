import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signupService(createUserDto: CreateUserDto) {
    throw new Error('Method not implemented.');
    if (await this.usersRepository.getUserByEmail(createUserDto.email))
      throw new ConflictException('email already exists');
    console.log(createUserDto.password);

    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.usersRepository.createUser(createUserDto);
    return await this.jwtService.signAsync({
      user_id: user.id,
      email: user.email,
    });
  }

  async loginService(email: string, password: string) {
    const user = await this.usersRepository.getUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password)))
      throw new BadRequestException('Invalid credentials');
    return await this.jwtService.signAsync({
      user_id: user.id,
      email: user.email,
    });
  }
}
