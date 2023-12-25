import { CategoryEntity } from 'src/modules/category.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, nullable: false })
  name: string;

  @Column()
  description: string;

  @Column({ nullable: false })
  price: number;
  @Column({ length: 500 })
  imageUrl: string;


  @Column({default: 100})
  quantity: number;

  @ManyToOne(() => CategoryEntity, (category) => category.products, {onDelete: "SET NULL", onUpdate: "SET NULL"})
  @JoinColumn()
  category: CategoryEntity;

  @CreateDateColumn()
  createAt: Date;
  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
