import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from 'src/files/files.module';
import { GoodsController } from './goods.controller';
import { GoodsService } from './goods.service';
import { Cosmetics } from './models/cosmetics.model';
import { Electronics } from './models/electronics.model';

@Module({
  controllers: [GoodsController],
  providers: [GoodsService],
  imports: [
    SequelizeModule.forFeature([Cosmetics, Electronics]),
    FilesModule,
    UsersModule,
  ],
})
export class GoodsModule {}
