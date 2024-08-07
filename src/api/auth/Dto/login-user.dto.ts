import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ description: 'username for login' })
  username: string;
  @ApiProperty({ description: 'password for login' })
  password: string;
}
