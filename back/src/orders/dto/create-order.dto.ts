import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Products } from 'src/products/entities/product.entity';

export class CreateOrderDto {
  @ApiProperty({
    example: 'd662c158-0ac6-40cc-8fdf-fd9c0ce12d9e',
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    example: [{ product_id: 'd662c158-0ac6-40cc-8fdf-fd9c0ce12d9e' }],
  })
  @IsArray()
  @ArrayMinSize(1)
  products: {
    product_id: string;
  }[];
}
