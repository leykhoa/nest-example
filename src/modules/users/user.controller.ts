import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ProductService } from '../products/product.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { ApiTags, ApiTooManyRequestsResponse } from '@nestjs/swagger';


@ApiTags('User')
@Controller('api/v1/users')
export class UserController {
  constructor(private productService: UserService) {}

  @Get()
  async getUser() {
    return await this.productService.getUser();
  }

  @Post()
  createUser() {}


  @ApiTooManyRequestsResponse()
  @Put(':id')
  updateUser() {}

  @Delete(':id')
  deleteUser() {}
}
