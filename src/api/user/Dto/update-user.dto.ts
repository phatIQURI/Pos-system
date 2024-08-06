import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'john', description: 'The first name of user' })
  firstName: string;

  @ApiProperty({ example: 'door', description: 'The last name of user' })
  lastName: string;

  @ApiProperty({ example: '2099998888', description: 'phone number' })
  phone: string;
}
