import { FilesService } from './../files/files.service';
import { CreateGoodDto } from './dto/create-good.dto';
import { Cosmetics } from './models/cosmetics.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Electronics } from './models/electronics.model';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GoodsService {
  constructor(
    @InjectModel(Cosmetics) private cosmeticsRepository: typeof Cosmetics,
    @InjectModel(Electronics) private electronicsRepository: typeof Electronics,
    private userRepository: UsersService,
    private filesService: FilesService,
  ) {}

  async getAllGoods() {
    const cosmetics = await this.cosmeticsRepository.findAll();
    const electronics = await this.electronicsRepository.findAll();
    // console.log(electronics);

    return { cosmetics, electronics };
  }

  async createCosmetic(dto: CreateGoodDto, image: any) {
    const fileName = await this.filesService.createFile(image);
    const cosmetics = await this.cosmeticsRepository.create({
      ...dto,
      image: 'http://localhost:5000/' + fileName,
    });
    return cosmetics;
  }

  async createElectronic(dto: CreateGoodDto, image: any) {
    const fileName = await this.filesService.createFile(image);
    // console.log(fileName);

    const electronics = await this.electronicsRepository.create({
      ...dto,
      image: 'http://localhost:5000/' + fileName,
    });

    return electronics;
  }

  async updateCosmiticsRating(id: string, rating: number, userEmail: string) {
    const good = await this.electronicsRepository.findByPk(id);

    if (good.voitedUsers.some((user) => user === userEmail)) {
      throw new HttpException(
        'Вы уже голосовали за товар',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const cosmetics = await this.cosmeticsRepository.findByPk(Number(id));
      const updatedCosmetics = await this.cosmeticsRepository.update(
        {
          rating: [...cosmetics.rating, rating],
          voitedUsers: [...good.voitedUsers, userEmail],
        },
        { where: { id } },
      );

      return updatedCosmetics;
    }
  }

  async updateElectronicsRating(id: string, rating: number, userEmail: string) {
    const good = await this.electronicsRepository.findByPk(id);

    if (good.voitedUsers.some((user) => user === userEmail)) {
      throw new HttpException(
        'Вы уже голосовали за товар',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const cosmetics = await this.electronicsRepository.findByPk(Number(id));
      const updatedCosmetics = await this.electronicsRepository.update(
        {
          rating: [...cosmetics.rating, rating],
          voitedUsers: [...good.voitedUsers, userEmail],
        },
        { where: { id } },
      );

      return updatedCosmetics;
    }
  }
}
