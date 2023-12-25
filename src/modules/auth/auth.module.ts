import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from '../users/user.repository';
import { JwtModule } from '@nestjs/jwt';

import 'dotenv/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entity/user.entity';
import * as admin from 'firebase-admin';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '10m' },
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepository,
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: () => {
        const serviceAccount = require('../../firebase-service.json');
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });
        return admin;
      },
    },
  ],
})
export class AuthModule {}
