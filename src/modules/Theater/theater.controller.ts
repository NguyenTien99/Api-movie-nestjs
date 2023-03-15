import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTheater } from './dto/createTheater.dto';
import { UpdateTheater } from './dto/updateTheater.dto';
import { TheaterService } from './theater.service';

@Controller('theaters')
export class TheaterController {
  constructor(private readonly theaterService: TheaterService) {}

  @Get()
  finAllCinemaComplex() {
    return this.theaterService.findAllTheater();
  }

  @Get('/:id')
  findCinemaComplex(@Param('id') id: number) {
    return this.theaterService.findTheaterById(id);
  }

  @Post()
  createCinemaComplex(@Body() data: CreateTheater) {
    return this.theaterService.createTheater(data);
  }

  @Put('/:id')
  updateCinemaComplex(@Param('id') id: number, @Body() data: UpdateTheater) {
    return this.theaterService.updateTheater(id, data);
  }

  @Delete('/:id')
  deleteCinemaComplex(@Param('id') id: number) {
    return this.theaterService.deleteTheater(id);
  }
}
