import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository, getRepository } from 'typeorm';
import { ProductEntity } from './entity/product.entity';
import { CreateProductDto } from './dto/createProduct.dto';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  findOne() {}
  findAll(queryObject: any): Promise<ProductEntity[]> {
    console.log(111, queryObject);

    return this.productRepository.find({
      ...queryObject,
      relations: { category: true },
    });
  }
  insert(data: CreateProductDto) {
    try {
      const productEntity = this.productRepository.create(data);
      return this.productRepository.save(productEntity);
    } catch (error) {
      throw new InternalServerErrorException({
        message: ['msgServer: Internal Server Error'],
      });
    }
  }
  insertMany(data: CreateProductDto[]) {
    console.log(22, data);

    const productEntity = this.productRepository.create(data);
    console.log(1111, productEntity);
    // return this.productRepository.save(productEntity);
  }
  update(id: number, data: any, transactionalEntityManager?: EntityManager) {
    if (id && transactionalEntityManager) {
      return transactionalEntityManager.update(ProductEntity, id, data);
    }
  }
  delete() {}
}
