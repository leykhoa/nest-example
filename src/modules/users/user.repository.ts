import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';

export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async findAll() {
    return this.userRepository.find({
      relations: ['messages'],
    });
  }

  findByPk() {}

  findByEmail(email: string) {
    console.log(444, email);

    try {
      return this.userRepository.findOne({
        where: {
          email: email,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException({
        mesage: ['msgServer: Internet Server Error, Please try again'],
      });
    }
  }

  create(data: CreateUserDto) {
    const userEntity = this.userRepository.create(data);
    return this.userRepository.save(userEntity);
  }

  update(id: number) {}

  delete() {}
}
