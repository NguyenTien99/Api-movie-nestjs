import { Body, Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { BookingTicketDto } from './dto/bookingTicket.dto';
import { TaoLichChieuDto } from './dto/taoLichChieu.dto';
import { ManageTicketService } from './manage-ticket.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('QuanLiDatVe')
export class ManageTicketController {
  constructor(private readonly manageTicket: ManageTicketService) {}

  @Post('/DatVe')
  @UseGuards(AuthGuard('jwt'))
  bookingTicket(@Body() data: BookingTicketDto) {
    return this.manageTicket.datVe(data);
  }

  @Get('/LayDanhSachPhongVe/:maLichChieu')
  @UseGuards(AuthGuard('jwt'))
  layDanhSachPhongVe(@Param('maLichChieu') maLichChieu: number) {
    return this.manageTicket.layDanhSachPhongVe(maLichChieu);
  }

  @Post('/TaoLichChieu')
  @UseGuards(AuthGuard('jwt'))
  taoLichChieu(@Body() data: TaoLichChieuDto) {
    return this.manageTicket.taoLichChieu(data);
  }
}
