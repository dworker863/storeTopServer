import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GoodsController } from './goods.controller';
import { GoodsService } from './goods.service';
import { Cosmetics } from './models/cosmetics.model';
import { Electronics } from './models/electronics.model';

@Module({
  controllers: [GoodsController],
  providers: [GoodsService],
  imports: [SequelizeModule.forFeature([Cosmetics, Electronics])],
})
export class GoodsModule {}
