import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryEntity } from './category.entity';

@Entity()
export class BrandEntity {
  @PrimaryGeneratedColumn()
  id: number;

  
  @Column()
  name: string;
}
