import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/Guards/auth.guard';
import { configEnv } from 'src/config/config';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: configEnv.ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: configEnv.ACCESS_TOKEN_EXPIRES },
    }),
  ],
  providers: [
    AuthService,
    PrismaService,
    UserService,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
