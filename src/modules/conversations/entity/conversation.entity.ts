import { MessageEntity } from 'src/modules/messages/entity/message.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ConversationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  userId: string;

  @Column({ nullable: false })
  lastMessage: string;

  @Column({ nullable: false })
  isSender: boolean;

  @Column({ default: false })
  isRead: boolean;

  @OneToMany(()=>MessageEntity, (messages)=> messages.conversation)
  messages: MessageEntity[];

  @CreateDateColumn()
  createAt: Date;
  @UpdateDateColumn()
  updateAt: Date;
  @DeleteDateColumn()
  deleteAt: Date;
}
