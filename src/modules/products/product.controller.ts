import { Controller, Post, Req, Get, Put, Delete, Body } from '@nestjs/common';

import { Request } from 'express';

import { CreateProductDto } from './dto/createProduct.dto';
import { ProductService } from './product.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

// @UseGuards(AuthGuard)
@Controller('api/v1/product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Roles(Role.Admin, Role.Editor)
  @Get()
  async getProduct() {
    this.productService.getProduct();
  }
  @Post()
  async createProduct(@Body() body: CreateProductDto) {
    try {
      return await this.productService.createProduct(body);
    } catch (error) {
      throw error;
    }
  }

  @Post('file')
  async createManyProduct(@Body() body) {
    return await this.productService.createManyProduct(body.dataCSV);
  }

  @Put(':id')
  async updateProduct(@Req() req: Request) {}
  @Delete(':id')
  async deleteProduct(@Req() req: Request) {}
}
