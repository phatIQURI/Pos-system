import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './api/product/product.module';
import { CategoriesModule } from './api/categories/categories.module';
import { UserModule } from './api/user/user.module';
import { AuthModule } from './api/auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    ProductModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
