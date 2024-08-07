import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'john', description: 'The first name of user' })
  firstName?: string;

  @ApiProperty({ example: 'door', description: 'The last name of user' })
  lastName?: string;

  @ApiProperty({ example: 'user', description: 'username for login' })
  username: string;

  @ApiProperty({ example: '111111', description: 'password' })
  password: string;

  @ApiProperty({ example: '2099998888', description: 'phone number' })
  phone?: string;
}
