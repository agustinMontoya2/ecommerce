import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { BodyProductsGuard } from 'src/guards/products.guard';
import { AuthGuard } from 'src/Auth/AuthGuard.guard';
import { Role } from 'src/Users/dto/create-user.dto';
import { Roles } from 'src/custom-validators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create() {
    return this.productsService.create();
  }

  @Get()
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 5) {
    return this.productsService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(
    BodyProductsGuard, //optionals field
    AuthGuard,
    RolesGuard,
  )
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const { name, description, price, stock, imgUrl } = updateProductDto;
    console.log(updateProductDto);

    return this.productsService.update(id, {
      name,
      description,
      price,
      stock,
      imgUrl,
    });
  }
}
