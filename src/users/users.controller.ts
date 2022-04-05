import { UsersService } from './users.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(): Promise<IUser[]> {
    return this.usersService.getAllUsers();
  }

  @Post()
  async create(@Body() userDto: CreateUserDto): Promise<IUser> {
    return this.usersService.createUser(userDto);
  }
}
