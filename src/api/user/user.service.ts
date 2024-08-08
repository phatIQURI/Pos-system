import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './Dto/create-user.dto';
import { Prisma, User } from '@prisma/client';
import { UpdateUserDto } from './Dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUser(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUserById(id: string): Promise<User | null> {
    const findUser = await this.prisma.user.findUnique({ where: { id } });
    if (!findUser) {
      throw new BadRequestException('User with this ID does not exist ');
    }
    return this.prisma.user.findUnique({ where: { id } });
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const existingUsername = await this.prisma.user.findFirst({
      where: { username: data?.username },
    });
    if (existingUsername) {
      throw new BadRequestException('User name has already exists');
    }

    const userCreateInput: Prisma.UserCreateInput = {
      firstName: data?.firstName,
      lastName: data?.lastName,
      username: data?.username,
      password: data?.password,
      phone: data?.phone,
    };
    return this.prisma.user.create({ data: userCreateInput });
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!existingUser) {
      throw new BadRequestException('User with this ID does not exist');
    }

    const updateUserInput: Prisma.UserUpdateInput = {
      firstName: data?.firstName,
      lastName: data?.lastName,
      phone: data?.phone,
    };

    return this.prisma.user.update({ where: { id }, data: updateUserInput });
  }

  async deleteUser(id: string): Promise<User> {
    const findUser = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!findUser) {
      throw new BadRequestException('user with this ID does not exist');
    }
    return this.prisma.user.delete({ where: { id: id } });
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }
}
