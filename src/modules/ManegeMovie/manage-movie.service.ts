import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Banner } from '../Banner/banner.model';
import { Movie } from '../Movie/movie.model';
import { CreatedMovieDto } from './dto/CreatedMovie.dto';
import { PagingMovie } from './dto/pagingMovie.dto';
import { UpdatedMovieDto } from './dto/UpdateMovie.dto';

@Injectable()
export class ManageMovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,

    @InjectRepository(Banner)
    private bannerRepository: Repository<Banner>,
  ) {}

  async findAllBanners() {
    try {
      return await this.bannerRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findAllMovies() {
    try {
      return await this.movieRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findMovieById(id: number) {
    try {
      const movie = await this.movieRepository.findOne({
        where: { id },
      });

      if (!movie) {
        throw new NotFoundException('Schedule not found');
      }

      return movie;
    } catch (error) {
      throw error;
    }
  }

  async paginationMovies(paging: PagingMovie) {
    try {
      const { page, pageSize } = paging;

      const total = await this.movieRepository.count();
      const movies = await this.movieRepository.find({
        take: pageSize || 10,
        skip: (page - 1) * pageSize || 0,
      });

      return {
        data: movies,
        paging: {
          total,
          page: page || 1,
          pageSize: pageSize || 10,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async createMovie(data: CreatedMovieDto) {
    try {
      return this.movieRepository.save(data);
    } catch (error) {
      throw error;
    }
  }

  async updateMovie(id: number, data: UpdatedMovieDto) {
    try {
      const movie = await this.movieRepository.findOne({
        where: { id },
      });

      if (!movie) {
        throw new NotFoundException('Schedule not found');
      }

      await this.movieRepository.update(id, data);

      return await this.movieRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteMovie(id: number) {
    try {
      const movie = await this.movieRepository.findOne({
        where: { id },
      });

      if (!movie) {
        throw new NotFoundException('Movie not found');
      }

      await this.movieRepository.delete(id);

      return 'true';
    } catch (error) {
      throw error;
    }
  }

  async uploadImageMovie(id: number, file: any) {
    try {
      if (!file) {
        throw new BadRequestException('Please upload file');
      }

      const movie = await this.movieRepository.findOne({
        where: { id },
      });

      if (!movie) {
        throw new NotFoundException('Schedule not found');
      }

      const url = `http://localhost:3000/${file.path}`;

      await this.movieRepository.update(id, { ...movie, hinhAnh: url });

      return await this.movieRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }
}
