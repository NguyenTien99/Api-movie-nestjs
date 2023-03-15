import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CreateSeatDto } from './dto/createSeat.dto';
import { UpdateSeatDto } from './dto/updateSeat.dto';
import { SeatService } from './seat.service';

@Controller('seats')
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @Get()
  findAllSeat() {
    return this.seatService.findAllSeat();
  }

  @Get('/:id')
  findSeatById(@Param('id') id: number) {
    return this.seatService.findSeatById(id);
  }

  @Post()
  createSeat(@Body() data: CreateSeatDto) {
    return this.seatService.createSeat(data);
  }

  @Put()
  updateSeat(@Param('id') id: number, @Body() data: UpdateSeatDto) {
    return this.seatService.updateSeat(id, data);
  }

  @Delete('/:id')
  deleteSeat(@Param('id') id: number) {
    return this.seatService.deleteSeat(id);
  }
}
