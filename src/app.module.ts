import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './api/product/product.module';
import { CategoriesModule } from './api/categories/categories.module';

@Module({
  imports: [PrismaModule, ProductModule, CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
