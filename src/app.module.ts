import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './api/product/product.module';
import { CategoriesModule } from './api/categories/categories.module';
import { UserModule } from './api/user/user.module';

@Module({
  imports: [PrismaModule, ProductModule, CategoriesModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
