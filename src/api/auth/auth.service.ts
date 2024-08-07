import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './Dto/login-user.dto';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../user/Dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

}
