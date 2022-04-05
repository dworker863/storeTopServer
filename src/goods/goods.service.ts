import { CreateGoodDto } from './dto/create-cosmetics.dto';
import { Cosmetics } from './models/cosmetics.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Electronics } from './models/electronics.model';

@Injectable()
export class GoodsService {
  constructor(
    @InjectModel(Cosmetics) private cosmeticsRepository: typeof Cosmetics,
    @InjectModel(Electronics) private electronicsRepository: typeof Electronics,
  ) {}

  async getAllGoods() {
    const cosmetics = await this.cosmeticsRepository.findAll();
    const electronics = await this.electronicsRepository.findAll();
    return { cosmetics, electronics };
  }

  async createCosmetic(dto: CreateGoodDto) {
    const cosmetics = await this.cosmeticsRepository.create(dto);
    return cosmetics;
  }

  async createElectronic(dto: CreateGoodDto) {
    const cosmetics = await this.electronicsRepository.create(dto);
    return cosmetics;
  }
}
