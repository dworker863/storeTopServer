import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { UsersService } from './../users/users.service';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/users/models/users.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    const token = await this.generateToken(user);
    return { ...user, token };
  }

  async registration(userDto: CreateUserDto) {
    const userByEmail = await this.userService.getUserByEmail(userDto.email);

    if (userByEmail) {
      throw new HttpException(
        'Пользователь с таким email существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const userByTel = await this.userService.getUserByTel(userDto.tel);

    if (userByTel) {
      throw new HttpException(
        'Пользователь с таким номером телефона существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });

    const token = await this.generateToken(user);
    return { ...user, token };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    console.log(user);

    // const passwordEquals = await bcrypt.compare(
    //   userDto.password,
    //   user.password,
    // );

    // if (user && passwordEquals) {
    return user;
    // }
    // throw new UnauthorizedException({
    //   message: 'Неверный email или пароль',
    // });
  }

  private async generateToken(user: User) {
    const payload = {
      id: user.id,
      username: user.username,
      tel: user.tel,
      email: user.email,
      role: user.role,
    };

    return this.jwtService.sign(payload);
  }
}
