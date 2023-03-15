import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CinemaComplex } from '../CinemaComplex/cinemaComplex.model';
import { CinemaSystem } from '../CinemaSystem/cinemaSystem.model';
import { Movie } from '../Movie/movie.model';

@Injectable()
export class ManageCinemaService {
  constructor(
    @InjectRepository(CinemaSystem)
    private cinemaSystemRepository: Repository<CinemaSystem>,

    @InjectRepository(CinemaComplex)
    private cinemaComplexRepository: Repository<CinemaComplex>,

    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async layThongTinHeThongRap() {
    try {
      return this.cinemaSystemRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async layThongTinCumRapTheoHeThong(cinemaSystemId: number) {
    try {
      const cinemaComplex = await this.cinemaSystemRepository.findOne({
        where: { id: cinemaSystemId },
        relations: { cinemaComplex: { theaters: true } },
      });

      if (!cinemaComplex) {
        throw new NotFoundException('Không tìm thấy hệ thống rạp');
      }

      return cinemaComplex;
    } catch (error) {
      throw error;
    }
  }

  async laythongtinLichChieuTheoCumRap(maCumRap) {
    try {
      const cinemaComplex = await this.cinemaComplexRepository.findOne({
        where: { id: maCumRap },
        relations: { theaters: { schedules: { movie: true } } },
      });

      if (!cinemaComplex) {
        throw new NotFoundException('Không tìm thấy cụm rạp');
      }

      return cinemaComplex;
    } catch (error) {}
  }

  async layThongTinLichChieuPhim(movieId: number) {
    try {
      const movie = await this.movieRepository.findOne({
        where: { id: movieId },
        relations: {
          schedules: { theater: { cinemaComplex: { cinemaSystem: true } } },
        },
      });

      if (!movie) {
        throw new NotFoundException('Movie not found');
      }

      return movie;
    } catch (error) {
      throw error;
    }
  }
}
