import { FilesService } from './../files/files.service';
import { CreateGoodDto } from './dto/create-good.dto';
import { Cosmetics } from './models/cosmetics.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Electronics } from './models/electronics.model';

@Injectable()
export class GoodsService {
  constructor(
    @InjectModel(Cosmetics) private cosmeticsRepository: typeof Cosmetics,
    @InjectModel(Electronics) private electronicsRepository: typeof Electronics,
    private FilesService: FilesService,
  ) {}

  async getAllGoods() {
    const cosmetics = await this.cosmeticsRepository.findAll();
    const electronics = await this.electronicsRepository.findAll();
    return { cosmetics, electronics };
  }

  async createCosmetic(dto: CreateGoodDto, image: any) {
    const fileName = await this.FilesService.createFile(image);
    const cosmetics = await this.cosmeticsRepository.create({
      ...dto,
      image: 'http://localhost:5000/' + fileName,
    });
    return cosmetics;
  }

  async createElectronic(dto: CreateGoodDto, image: any) {
    const fileName = await this.FilesService.createFile(image);

    const electronics = await this.electronicsRepository.create({
      ...dto,
      image: 'http://localhost:5000/' + fileName,
    });
    return electronics;
  }
}
