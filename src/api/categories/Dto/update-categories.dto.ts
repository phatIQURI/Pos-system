import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-categories.dto';

export class UpdateCategoriesDto extends PartialType(CreateCategoryDto) {}
