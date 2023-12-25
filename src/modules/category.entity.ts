import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BrandEntity } from './brand.entity';
import { ProductEntity } from './products/entity/product.entity';

@Entity()
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => BrandEntity)
  @JoinTable()
  brands: BrandEntity[];

  @OneToMany(() => ProductEntity, (product) => product.category, {
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL',
  })
  products: ProductEntity[];
}
