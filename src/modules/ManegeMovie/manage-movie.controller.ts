import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreatedMovieDto } from './dto/CreatedMovie.dto';
import { PagingMovie } from './dto/pagingMovie.dto';
import { UpdatedMovieDto } from './dto/UpdateMovie.dto';
import { ManageMovieService } from './manage-movie.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('QuanLyPhim')
export class ManageMovieController {
  constructor(private readonly manageMovie: ManageMovieService) {}

  @Get('/LayDanhSachBanner')
  layDanhSachBanner() {
    return this.manageMovie.findAllBanners();
  }

  @Get('/LayDanhSachPhim')
  layDanhSachPhim() {
    return this.manageMovie.findAllMovies();
  }

  @Get('/LayThongTinPhim/:id')
  layThongTinPhim(@Param('id') id: number) {
    return this.manageMovie.findMovieById(id);
  }

  @Get('/LayDanhSachPhimPhanTrang')
  layDanhSachPhimPhanTrang(@Query() query: PagingMovie) {
    return this.manageMovie.paginationMovies(query);
  }

  @Post('/ThemPhim')
  @UseGuards(AuthGuard('jwt'))
  themPhim(@Body() data: CreatedMovieDto) {
    return this.manageMovie.createMovie(data);
  }

  @Put('/CapNhatPhim/:id')
  @UseGuards(AuthGuard('jwt'))
  capNhatPhim(@Param('id') id: number, @Body() data: UpdatedMovieDto) {
    return this.manageMovie.updateMovie(id, data);
  }

  @Delete('/XoaPhim/:id')
  @UseGuards(AuthGuard('jwt'))
  xoaPhim(@Param('id') id: number) {
    return this.manageMovie.deleteMovie(id);
  }

  @Post('/ThemHinhPhim/:id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './static/imageMovie',
        filename: (req, file, cb) => {
          const prefix = Date.now() + '-' + Math.round(Math.random() * 1e9);

          cb(null, `${prefix}-${file.originalname}`);
        },
      }),
    }),
  )
  themHinhPhim(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.manageMovie.uploadImageMovie(id, file);
  }
}
