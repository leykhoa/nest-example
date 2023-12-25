import { BadGatewayException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/createProduct.dto';
import { ProductRepository } from './product.repository';
import { ProductEntity } from './entity/product.entity';
import { QueryRouter } from './interfaces/queryProduct';
import { Like } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}
  getProduct(query: QueryRouter) {
    const queryObject = {};

    if (query.searchValue && query.searchKey) {
      (queryObject as any).where = {
        [query.searchKey ? query.searchKey : 'name']: Like(query.searchValue),
      };
    }

    if (query.sortKey && query.sortValue) {
      (queryObject as any).order = {
        [query.sortKey]: query.searchValue == 'asc' ? 'asc' : 'desc',
      };
    }
    if (query.page && query.pageSize) {
      (queryObject as any).skip = Number((query.page - 1) * query.pageSize);
      (queryObject as any).take = Number(query.pageSize);
    }

    return this.productRepository.findAll(queryObject);
  }

  async createProduct(data: CreateProductDto) {
    const rel = await this.productRepository.insert(data);
    return rel.id;
  }
  async createManyProduct(data: CreateProductDto[]) {
    const rel = await this.productRepository.insertMany(data);
  }

  updateProduct() {}

  deleteProduct(id: number) {}
}
