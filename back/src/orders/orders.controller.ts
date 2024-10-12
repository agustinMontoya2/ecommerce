import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from 'src/Auth/AuthGuard.guard';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/custom-validators/roles.decorator';
import { Role } from 'src/Users/dto/create-user.dto';

@ApiTags('orders')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  //todo validation pipe
  addorders(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.addorders(createOrderDto);
  }

  @Get(':id')
  getorder(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.getorder(id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.deleteOrder(id);
  }
}
