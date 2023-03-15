import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookingTicketService } from './booking-ticket.service';
import { CreateTicketDto, UpdateTicketDto } from './dto';

@Controller('bookingTicket')
export class BookingTicketController {
  constructor(private readonly bookingTicketService: BookingTicketService) {}

  @Get()
  findAllTicket() {
    return this.bookingTicketService.findAllTicket();
  }

  @Get('/:id')
  findTicket(@Param('id') id: number) {
    return this.bookingTicketService.findTicketById(id);
  }

  @Post()
  createTicket(@Body() data: CreateTicketDto) {
    return this.bookingTicketService.createTicket(data);
  }

  @Put('/:id')
  updateTicket(@Param('id') id: number, @Body() data: UpdateTicketDto) {
    return this.bookingTicketService.updateTicket(id, data);
  }

  @Delete('/:id')
  deleteTicket(@Param('id') id: number) {
    return this.bookingTicketService.deleteTicket(id);
  }
}
