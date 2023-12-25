import { ConversationEntity } from 'src/modules/conversations/entity/conversation.entity';
import { UserEntity } from 'src/modules/users/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.messages)
  @JoinColumn()
  user: UserEntity;

  @Column()
  conversationId: number;

  @ManyToOne(() => ConversationEntity, (conversation) => conversation.messages)
  @JoinColumn()
  conversation: ConversationEntity;

  @Column({ nullable: false })
  message: string;

  @Column({ nullable: false })
  isSender: boolean;

  @CreateDateColumn()
  createAt: Date;

  
  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
