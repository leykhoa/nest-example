import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entity/order.entity';
import { ProductModule } from '../products/product.module';

@Module({
  controllers: [OrderController],
  imports: [TypeOrmModule.forFeature([OrderEntity]), ProductModule],
})
export class OrderModule {}
