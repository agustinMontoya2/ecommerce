import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({
    description: 'Optional Name of the product',
    example: 'Iphone 15',
  })
  name?: string;

  @ApiProperty({
    description: 'Optional Description of the product',
    example: 'The best smartphone in the world',
  })
  description?: string;

  @ApiProperty({
    description: 'Optional Price of the product',
    example: 199.99,
  })
  price?: number;

  @ApiProperty({
    description: 'Optional Stock of the product',
    example: 12,
  })
  stock?: number;

  @ApiProperty({
    description: 'Optional Image URL of the product',
    example:
      'https://res.cloudinary.com/dxpxzcj2i/image/upload/v1724243935/gvmpxhbyz3rvdsvnhvhm.webp',
  })
  imgUrl?: string;
}
