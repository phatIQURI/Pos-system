import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Beverages',
    description: 'The name of the category',
  })
  name: string;
}
