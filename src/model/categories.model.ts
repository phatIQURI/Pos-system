import { Prisma } from '@prisma/client';

export class Category implements Prisma.CategoryCreateInput {
  id: string;
  name: string;
}
