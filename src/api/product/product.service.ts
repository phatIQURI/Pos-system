import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from '../../model/product.model';
import { CreateProductDto } from './Dto/create-product.dto';
import { UpdateProductDto } from './Dto/update-product.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getAllProducts(): Promise<Product[]> {
    return this.prisma.product.findMany({
      include: {
        category: true,
      },
    });
  }

  async getProduct(id: string): Promise<Product | null> {
    const existingProduct = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!existingProduct) {
      throw new BadRequestException('Product with this ID does not exist');
    }
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
  }

  async createProduct(data: CreateProductDto): Promise<Product> {
    const existingProduct = await this.prisma.product.findFirst({
      where: { name: data?.name },
    });
    if (existingProduct) {
      throw new BadRequestException('Product with this name already exists');
    }
    const productCreateInput: Prisma.ProductCreateInput = {
      name: data.name,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
      category: {
        connect: { id: data.categoryId },
      },
    };

    return this.prisma.product.create({
      data: productCreateInput,
    });
  }

  async updateProduct(id: string, data: UpdateProductDto): Promise<Product> {
    const existingProduct = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!existingProduct) {
      throw new BadRequestException('Product with this ID does not exist');
    }
    return this.prisma.product.update({ where: { id }, data });
  }

  async deleteProduct(id: string): Promise<Product> {
    const existingProduct = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!existingProduct) {
      throw new BadRequestException('Product with this ID does not exist');
    }
    return this.prisma.product.delete({ where: { id: id } });
  }
}
