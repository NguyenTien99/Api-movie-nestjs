import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieDto } from './dto/movie.dto';
import { Movie } from './movie.model';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async getMovies(): Promise<Movie[]> {
    try {
      return await this.movieRepository.find({ relations: { banners: true } });
    } catch (error) {
      throw error;
    }
  }

  async getMovieById(id: number): Promise<Movie> {
    try {
      const movie = await this.movieRepository.findOne({
        where: { id },
        relations: { banners: true },
      });

      if (!movie) {
        throw new NotFoundException('Movie not found');
      }

      return movie;
    } catch (error) {
      throw error;
    }
  }

  async createMovie(data: MovieDto) {
    try {
      return await this.movieRepository.save(data);
    } catch (error) {
      throw error;
    }
  }

  async updateMovie(id: number, data: MovieDto) {
    try {
      const movie = await this.movieRepository.findOne({ where: { id } });
      if (!movie) {
        throw new NotFoundException('Movie not found');
      }

      await this.movieRepository.update(id, data);

      return await this.movieRepository.findOne({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async deleteMovie(id: number) {
    try {
      const movie = await this.movieRepository.findOne({ where: { id } });
      if (!movie) {
        throw new NotFoundException('Movie not found');
      }

      await this.movieRepository.delete(id);

      return 'true';
    } catch (error) {
      throw error;
    }
  }
}
