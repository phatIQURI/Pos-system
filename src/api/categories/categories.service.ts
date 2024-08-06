import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './Dto/create-categories.dto';
import { UpdateCategoriesDto } from './Dto/update-categories.dto';
import { Category } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllCategories() {
    return this.prisma.category.findMany({
      include: {
        Product: true,
      },
    });
  }

  async findOneCategories(id: string) {
    const existingCategories = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!existingCategories) {
      throw new BadRequestException('Categories with this ID does not exist');
    }
    return this.prisma.category.findUnique({
      where: { id },
      include: {
        Product: true,
      },
    });
  }

  async createCategories(createCategoriesDto: CreateCategoryDto) {
    const createCat = this.prisma.category.create({
      data: createCategoriesDto,
    });
    return createCat;
  }

  async updateCategory(
    id: string,
    data: UpdateCategoriesDto,
  ): Promise<Category> {
    try {
      const existingCategory = await this.prisma.category.findUnique({
        where: { id },
      });
      if (!existingCategory) {
        throw new BadRequestException('Category with this ID does not exist');
      }

      return await this.prisma.category.update({
        where: { id },
        data,
      });
    } catch (error) {
      console.error('Error updating category:', error);
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'An unexpected error occurred while updating the category',
        );
      }
    }
  }

  async deleteCategories(id: string): Promise<Category> {
    const existingCategories = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!existingCategories) {
      throw new BadRequestException('Category with this ID does not exist');
    }
    const deleteCategories = this.prisma.category.delete({ where: { id: id } });
    return deleteCategories;
  }
}
