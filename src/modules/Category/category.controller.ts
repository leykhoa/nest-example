import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../category.entity';
import { Repository } from 'typeorm';

@Controller('api/v1/categories')
export class CategoryController {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  @Get()
  getData() {
    return this.categoryRepository.find({
      relations: ['products'],
    });
  }
}
