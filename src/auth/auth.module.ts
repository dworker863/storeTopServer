import { FilesModule } from 'src/files/files.module';
import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    UsersModule,
    PassportModule,
    FilesModule,
    JwtModule.register({
      secret: 'SECRET',
      signOptions: {
        expiresIn: '720h',
      },
    }),
  ],
})
export class AuthModule {}
