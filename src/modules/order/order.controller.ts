import { Controller, InternalServerErrorException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entity/order.entity';
import { Repository } from 'typeorm';
import { EntityManager } from 'typeorm';
import { ProductRepository } from '../products/product.repository';

@Controller('api/v1/orders')
export class OrderController {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    private entityManager: EntityManager,
    private productRepository: ProductRepository,
  ) {}

  @Post()
  async createOrder() {
    return await this.entityManager.transaction(
      async (transactionalEntityManager) => {
        try {
          const newOrder = this.orderRepository.create({
            userId: 2,
            total: 9999,
          });
          await transactionalEntityManager.save(newOrder);

          const result = await this.productRepository.update(
            2,
            { quantity: 50 },
            transactionalEntityManager,
          );

          console.log(result);

          if (result.affected === 0) {
            throw new InternalServerErrorException({
              message: ['msgServer: Internal Server Error'],
            });
          }

          return {
            message: 'Order updated successfully',
          };
        } catch (error) {
          throw new InternalServerErrorException({
            message: ['msgServer: Internal Server Error'],
          });
        }
      },
    );
  }
}
