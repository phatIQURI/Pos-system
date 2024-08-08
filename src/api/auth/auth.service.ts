import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginUserDto } from './Dto/login-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { configEnv } from 'src/config/config';

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

    const createAccessToken = this.jwtService.sign(payload);

    const createRefreshToken = this.jwtService.sign(payload, {
      secret: configEnv.REFRESH_TOKEN_SECRET,
      expiresIn: configEnv.REFRESH_TOKEN_EXPIRES,
    });

    return {
      access_token: createAccessToken,
      refresh_token: createRefreshToken,
    };
  }

  async refresh(refreshToken: string): Promise<any> {
    console.log(refreshToken);
    
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: configEnv.REFRESH_TOKEN_SECRET,
      });

      const newAccessToken = this.jwtService.sign(
        { sub: payload.sub, username: payload.username },
        {
          secret: configEnv.ACCESS_TOKEN_SECRET,
          expiresIn: configEnv.ACCESS_TOKEN_EXPIRES,
        },
      );

      return { access_token: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
