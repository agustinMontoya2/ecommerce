import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BodyUsersGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const body = context.switchToHttp().getRequest().body;
    const { email, name, password, address, phone, country } = body;

    // if (!email|| !name|| !password|| !address|| !phone) {
    if (!email && !name && !password && !address && !phone && !country) {
      throw new BadRequestException('Missing required fields');
    }
    return true;
  }
}
