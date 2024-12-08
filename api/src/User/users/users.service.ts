import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity'; // Создайте сущность User
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(login: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { login } });
  }

  async createUser (login: string, password: string, roleId: number): Promise<User> {
    const hashedPassword = await argon2.hash(password);
    const user = this.userRepository.create({ login, password: hashedPassword, roleId });
    return this.userRepository.save(user);
  }
}
