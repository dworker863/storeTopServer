import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async getAllUsers() {
    const users = await this.userRepository.findAll();
    return users;
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async updateUser(id, dto: CreateUserDto) {
    const result = await this.userRepository.update(dto, { where: { id } });
    const user = await this.userRepository.findOne({ where: { id: id } });

    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async getUserByTel(phone: string) {
    const user = await this.userRepository.findOne({ where: { phone } });
    console.log(user);
    return user;
  }
}
