import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';
import { LoginUserDto } from './Dto/login-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async logIn(loginDto: LoginUserDto): Promise<any> {
    const findUser = await this.userService.findUserByUsername(
      loginDto.username,
    );

    if (findUser?.password !== loginDto.password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: findUser.id, username: findUser.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
