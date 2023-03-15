import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ManageCinemaService } from './manage-cinema.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('QuanLyRap')
export class ManageCinemaController {
  constructor(private readonly manageCinemaService: ManageCinemaService) {}

  @Get('/LayThongTinHeThongRap')
  @UseGuards(AuthGuard('jwt'))
  layThongTinHeThongRap() {
    return this.manageCinemaService.layThongTinHeThongRap();
  }

  @Get('/LayThongTinCumRapTheoHeThong/:cinemaSystemId')
  @UseGuards(AuthGuard('jwt'))
  layThongTinCumRapTheoHeThong(
    @Param('cinemaSystemId') cinemaSystemId: number,
  ) {
    return this.manageCinemaService.layThongTinCumRapTheoHeThong(
      cinemaSystemId,
    );
  }

  @Get('LaythongtinLichChieuTheoCumRap/:maCumRap')
  @UseGuards(AuthGuard('jwt'))
  laythongtinLichChieuTheoCumRap(@Param('maCumRap') maCumRap: number) {
    return this.manageCinemaService.laythongtinLichChieuTheoCumRap(maCumRap);
  }

  @Get('/layThongTinLichChieuPhim/:movieId')
  @UseGuards(AuthGuard('jwt'))
  layThongTinLichChieuPhim(@Param('movieId') movieId: number) {
    return this.manageCinemaService.layThongTinLichChieuPhim(movieId);
  }
}
