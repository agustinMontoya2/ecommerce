import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  Req,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import { TokenGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { updateMeDto, UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UseGuards(TokenGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @SetMetadata('roles', ['admin'])
  @UseGuards(RolesGuard)
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    return this.usersService.findAllUsers(page, limit);
  }

  @Get('me')
  async getMe(@Req() req: Request) {
    const user = req['user'];
    return await this.usersService.getUserById(user.id);
  }

  @Patch('me')
  async updateMe(@Req() req: Request, @Body() updateUserDto: updateMeDto) {
    const user = req['user'];
    return await this.usersService.updateUser(user.id, updateUserDto);
  }

  @Patch(':id')
  @SetMetadata('roles', ['admin'])
  @UseGuards(RolesGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.updateUser(id, updateUserDto);
  }
}
