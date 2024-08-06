import { Prisma } from '@prisma/client';

export class Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  categoryId: string;
}
