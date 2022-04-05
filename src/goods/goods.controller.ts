import { Body, Controller, Get, Post } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { CreateGoodDto } from './dto/create-cosmetics.dto';

@Controller('goods')
export class GoodsController {
  constructor(private goodsService: GoodsService) {}

  @Get()
  async findAll() {
    return this.goodsService.getAllGoods();
  }

  @Post('/cosmetics')
  async postCosmetic(@Body() CosmeticsDto: CreateGoodDto) {
    return this.goodsService.createCosmetic(CosmeticsDto);
  }

  @Post('/electronics')
  async postElectronic(@Body() ElectronicsDto: CreateGoodDto) {
    return this.goodsService.createElectronic(ElectronicsDto);
  }
}
