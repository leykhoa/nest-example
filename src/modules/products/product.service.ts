import { BadGatewayException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/createProduct.dto';
import { ProductRepository } from './product.repository';
import { ProductEntity } from './entity/product.entity';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}
  getProduct() {
    this.productRepository.findAll();
  }

  async createProduct(data: CreateProductDto) {
    const rel = await this.productRepository.insert(data);
    return rel.id;
  }
  async createManyProduct (data: CreateProductDto[]) {

    const rel = await this.productRepository.insertMany(data);
    
  }

  updateProduct() {}

  deleteProduct(id: number) {}
}
