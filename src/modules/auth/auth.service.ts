import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserRepository } from '../users/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private userRepoitory: UserRepository,
    private jwtService: JwtService,
  ) {}
  async login(data: LoginDto) {
    const user = await this.userRepoitory.findByEmail(data.email);

    if (!user) {
      throw new UnauthorizedException({
        message: ['msgEmail: Email is incorrect'],
      });
    }

    if (await this.comparePassword(data.password, user.password)) {
      const { password, createAt, updateAt, ...other } = user;

      return {
        token: await this.createToken({ userId: user.id, role: user.role }),
        data: other,
      };
    } else {
      throw new UnauthorizedException({
        message: ['msgPassword: Password is incorrect'],
      });
    }
  }

  async register(data: RegisterDto) {
    const user = await this.userRepoitory.findByEmail(data.email);
    console.log(user);

    if (user) {
      throw new BadRequestException({
        message: [
          'msgEmail: Email is exist. Please register anothor a difference email or login',
        ],
      });
    }

    const newData = {
      ...data,
      password: await this.hashPassword(data.password),
    };
    return this.userRepoitory.create(newData);
  }

  async fetchUser() {}

  protected async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  protected async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

  protected async createToken(data: { userId: number; role: number }) {
    try {
      return await this.jwtService.signAsync(data);
    } catch (error) {
      console.log(111, error);
    }
  }
}
