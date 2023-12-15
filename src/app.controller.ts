import { Controller, Get } from '@nestjs/common';
import { CategoryEntity } from './modules/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('api/v1')
export class AppController {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  @Get()
  getData() {
    return this.categoryRepository.find({
      relations: {
        brands: true,
      },
    });
  }
}
