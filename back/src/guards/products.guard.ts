import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BodyProductsGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const body = context.switchToHttp().getRequest().body;
    const { name, description, price, stock, imgUrl } = body;
    console.log(body);

    // if (!name || !description || !price || stock === undefined || !imgUrl) {
    if (!name && !description && !price && stock === undefined && !imgUrl) {
      throw new BadRequestException('Missing required fields');
    }
    return true;
  }
}
