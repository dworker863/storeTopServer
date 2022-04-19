import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUser(@Request() req) {
    return req.user;
  }

  @Post('/registration')
  @UseInterceptors(FileInterceptor('image'))
  async registration(@Body() userDto: CreateUserDto, @UploadedFile() image) {
    return this.authService.registration(userDto, image);
  }
}
