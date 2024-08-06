import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from './Dto/create-categories.dto';
import { Category } from '@prisma/client';
import { UpdateCategoriesDto } from './Dto/update-categories.dto';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'find all categories and product' })
  @ApiResponse({ status: 200, description: 'Return all categories.' })
  async findAllCategories() {
    return this.categoriesService.findAllCategories();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a categories by ID' })
  @ApiResponse({ status: 200, description: 'Return the categories.' })
  @ApiResponse({ status: 404, description: 'categories not found.' })
  async findOneCategories(@Param('id') id: string) {
    return this.categoriesService.findOneCategories(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new categories' })
  @ApiResponse({
    status: 201,
    description: 'The categories has been successfully created.',
  })
  async createCategories(
    @Body() createCategoriesDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.createCategories(createCategoriesDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing categories' })
  @ApiResponse({
    status: 200,
    description: 'The categories has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Categories not found.' })
  async updateCategories(
    @Param('id') id: string,
    @Body() updateCategoriesDto: UpdateCategoriesDto,
  ) {
    return this.categoriesService.updateCategory(id, updateCategoriesDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete categories' })
  @ApiResponse({
    status: 200,
    description: 'The categories has been successfully deleted.',
  })
  async deleteCategories(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.deleteCategories(id);
  }
}
