import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Pepsi', description: 'The name of product' })
  name: string;

  @ApiProperty({ example: 'Pepsi', description: 'The name of product' })
  description: string;

  @ApiProperty({ example: 12000, description: 'price of product' })
  price: number;

  @ApiProperty({ example: 10, description: 'quantity of product' })
  quantity: number;

  @ApiProperty({
    example: 'some-uuid-string',
    description: 'The ID of the category the product belongs to',
  })
  categoryId: string;
}
