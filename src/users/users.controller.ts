import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Param,
  Get,
  Post,
  Put,
  Delete,
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

  @Post('/viewed')
  async addGoods(@Body() userGoods: { email: string; goodName: string }) {
    return this.usersService.addViewedGoods(
      userGoods.email,
      userGoods.goodName,
    );
  }

  @Post('/:userId/favorites')
  async addFavorite(
    @Param('userId') id: string,
    @Body() favorite: { favorite: string },
  ) {
    return this.usersService.addGoodToFavorite(id, favorite.favorite);
  }

  @Delete('/:userId/favorites')
  async removeFavorite(
    @Param('userId') id: string,
    @Body() favorite: { favorite: string },
  ) {
    return this.usersService.removeGoodFromFavorite(id, favorite.favorite);
  }
}
