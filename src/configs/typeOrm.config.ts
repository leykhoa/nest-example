import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';
import { BrandEntity } from 'src/modules/brand.entity';
import { CategoryEntity } from 'src/modules/category.entity';
import { ConversationEntity } from 'src/modules/conversations/entity/conversation.entity';
import { MessageEntity } from 'src/modules/messages/entity/message.entity';
import { OrderEntity } from 'src/modules/order/entity/order.entity';
import { ProductEntity } from 'src/modules/products/entity/product.entity';
import { UserEntity } from 'src/modules/users/entity/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3308,

  username: process.env.DB_USER_NAME,
  password: process.env.DB_ROOT_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  entities: [
    ProductEntity,
    UserEntity,
    ConversationEntity,
    MessageEntity,
    CategoryEntity,
    BrandEntity,
    OrderEntity,
  ],
};
