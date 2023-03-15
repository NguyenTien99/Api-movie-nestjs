import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBanner, UpdateBanner } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('banners')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Get()
  findAllBanner() {
    return this.bannerService.findAllBanner();
  }

  @Get('/:id')
  findBannerById(@Param('id') id: number) {
    return this.bannerService.findBannerById(id);
  }

  @Post()
  @HttpCode(201)
  createBanner(@Body() data: CreateBanner) {
    return this.bannerService.createBanner(data);
  }

  @Put('/:id')
  updateBanner(@Param('id') id: number, @Body() data: UpdateBanner) {
    return this.bannerService.updateBanner(id, data);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.bannerService.deleteBanner(id);
  }

  @Post('/uploadBanner/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './static/imageBanner',
        filename: (req, file, cb) => {
          const prefix = Date.now() + '-' + Math.round(Math.random() * 1e9);

          cb(null, `${prefix}-${file.originalname}`);
        },
      }),
    }),
  )
  uploadBanner(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.bannerService.uploadBanner(id, file);
  }
}
