import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/Users/dto/create-user.dto';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
