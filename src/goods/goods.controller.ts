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
import { IGood } from './interfaces/IGood';

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
  ): Promise<IGood> {
    return this.goodsService.createCosmetic(CosmeticsDto, image);
  }

  @Post('/electronics')
  @UseInterceptors(FileInterceptor('image'))
  async postElectronic(
    @Body() ElectronicsDto: CreateGoodDto,
    @UploadedFile() image,
  ) {
    console.log(image);
    return this.goodsService.createElectronic(ElectronicsDto, image);
  }
}
