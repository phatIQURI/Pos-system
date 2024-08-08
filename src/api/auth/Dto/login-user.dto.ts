import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ example: 'phat', description: 'username for login' })
  username: string;
  @ApiProperty({ example: 'password', description: 'password for login' })
  password?: string;
}
