import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
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
  @UseInterceptors(FileInterceptor('image'))
  async create(@Body() userDto: CreateUserDto, @UploadedFile() image) {
    return this.usersService.createUser(userDto, image);
  }

  @Put('/:userId')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('userId') id: string,
    @Body() userDto: CreateUserDto,
    @UploadedFile() image,
  ) {
    return this.usersService.updateUser(id, userDto, image);
  }
}
