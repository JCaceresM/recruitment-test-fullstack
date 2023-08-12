import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async find(obj): Promise<UserEntity | undefined> {
    return this.usersRepository
      .createQueryBuilder('user')
      .where('user.email = :username', { username: obj.username })
      .orWhere('user.username = :email', { email: obj.username })
      .getOne();
  }

  async createUser(user: CreateUserDto): Promise<Record<string, string>> {
    try {
      const newUser = this.usersRepository.create(user);
       await this.usersRepository.save(newUser);
       return {
        status: 'ok',
        message: 'User Created'
       }
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new NotFoundException('User could not be created');
      }
    }
  }

}
