import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/users.model';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private fileService: FilesService,
  ) {}

  async getAllUsers() {
    const users = await this.userRepository.findAll();
    return users;
  }

  async createUser(dto: CreateUserDto, image: any) {
    const fileName = image && (await this.fileService.createFile(image));
    const user = await this.userRepository.create({
      ...dto,
      image: 'http://localhost:5000/' + fileName,
    });

    return user;
  }

  async updateUser(id, dto: CreateUserDto, image: any) {
    const fileName = image && (await this.fileService.createFile(image));
    const result = await this.userRepository.update(
      { ...dto, image: 'http://localhost:5000/' + fileName },
      { where: { id } },
    );
    const users = this.getAllUsers();
    return users;
  }

  async addViewedGoods(email: string, goodName: string) {
    console.log(goodName);

    const user = await this.getUserByEmail(email);

    if (user.lastViewedGoods.some((good) => good !== goodName)) {
      const updatedUser = await this.userRepository.update(
        {
          lastViewedGoods: [goodName, ...user.lastViewedGoods].slice(0, 5),
        },
        { where: { email } },
      );

      return updatedUser;
    }
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
