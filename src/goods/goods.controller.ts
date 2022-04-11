import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { GoodsService } from './goods.service';
import { CreateGoodDto } from './dto/create-good.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('goods')
export class GoodsController {
  constructor(private goodsService: GoodsService) {}

  @Get()
  async findAll() {
    return this.goodsService.getAllGoods();
  }

  @Post('/cosmetics')
  @UseInterceptors(FileInterceptor('image'))
  async postCosmetic(
    @Body() CosmeticsDto: CreateGoodDto,
    @UploadedFile() image,
  ) {
    return this.goodsService.createCosmetic(CosmeticsDto, image);
  }

  @Post('/electronics')
  async postElectronic(
    @Body() ElectronicsDto: CreateGoodDto,
    @UploadedFile() image,
  ) {
    return this.goodsService.createElectronic(ElectronicsDto, image);
  }
}
