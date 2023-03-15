import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CinemaSystemService } from './cinema-system.service';
import { createCinemaSystem } from './dto/createCinemaSystem.dto';
import { UpdateCinemaSystem } from './dto/updateCinemSystem.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('cinemaSystem')
export class CinemaSystemController {
  constructor(private readonly cinemaSystemService: CinemaSystemService) {}

  @Get()
  findAllCinemaSystem() {
    return this.cinemaSystemService.findAllCinemaSystem();
  }

  @Get('/:id')
  findCinemaSystemById(@Param('id') id: number) {
    return this.cinemaSystemService.findCinemaSystem(id);
  }

  @Post()
  createCinemaSystem(@Body() data: createCinemaSystem) {
    return this.cinemaSystemService.createCinemaSystem(data);
  }

  @Put('/:id')
  updateCinemaSystem(
    @Param('id') id: number,
    @Body() data: UpdateCinemaSystem,
  ) {
    return this.cinemaSystemService.updateCinemaSystem(id, data);
  }

  @Delete('/:id')
  deleteCinemaSystem(@Param('id') id: number) {
    return this.cinemaSystemService.deleteCinemaSystem(id);
  }

  @Post('/uploadLogo/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './static/imageLogoCinema',
        filename: (req, file, cb) => {
          const prefix = Date.now() + '-' + Math.round(Math.random() * 1e9);

          cb(null, `${prefix}-${file.originalname}`);
        },
      }),
    }),
  )
  uploadLogo(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.cinemaSystemService.uploadLogoCinema(id, file);
  }
}
