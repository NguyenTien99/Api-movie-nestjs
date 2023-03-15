import { Controller } from '@nestjs/common';
import { Body, Param, Get, Post, Put, Delete } from '@nestjs/common/decorators';
import { CinemaComplexService } from './cinema-complex.service';
import { CreateCinemaComplex } from './dto/createCinemaComplex.dto';
import { UpdateCinemaComplex } from './dto/updateCinemaComplex.dto';

@Controller('cinemaComplex')
export class CinemaComplexController {
  constructor(private readonly cinemaComplexService: CinemaComplexService) {}

  @Get()
  finAllCinemaComplex() {
    return this.cinemaComplexService.findAllCinemaComplex();
  }

  @Get('/:id')
  findCinemaComplex(@Param('id') id: number) {
    return this.cinemaComplexService.findCinemaComplexById(id);
  }

  @Post()
  createCinemaComplex(@Body() data: CreateCinemaComplex) {
    return this.cinemaComplexService.createCinemaComplex(data);
  }

  @Put('/:id')
  updateCinemaComplex(
    @Param('id') id: number,
    @Body() data: UpdateCinemaComplex,
  ) {
    return this.cinemaComplexService.updateCinemaComplex(id, data);
  }

  @Delete('/:id')
  deleteCinemaComplex(@Param('id') id: number) {
    return this.cinemaComplexService.deleteCinemaComplex(id);
  }
}
