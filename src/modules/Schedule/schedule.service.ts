import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../Movie/movie.model';
import { Theater } from '../Theater/theater.model';
import { CreateScheduleDto } from './dto/createSchedule.dto';
import { UpdateScheduleDto } from './dto/updateSchedule.dto';
import { Schedule } from './schedule.model';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,

    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,

    @InjectRepository(Theater)
    private theaterRepository: Repository<Theater>,
  ) {}

  async findAllSchedule() {
    try {
      return this.scheduleRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findScheduleById(id: number) {
    try {
      const schedule = await this.scheduleRepository.findOne({
        where: { id },
        relations: { movie: true, theater: { cinemaComplex: true } },
      });

      if (!schedule) {
        throw new NotFoundException('Schedule not found');
      }

      return schedule;
    } catch (error) {
      throw error;
    }
  }

  async createSchedule(data: CreateScheduleDto) {
    try {
      const movie = await this.movieRepository.findOne({
        where: { id: data.movieId },
      });

      if (!movie) {
        throw new NotFoundException('Movie not found');
      }

      const theater = await this.theaterRepository.findOne({
        where: { id: data.theaterId },
      });

      if (!theater) {
        throw new NotFoundException('Theater not found');
      }

      return await this.scheduleRepository.save(data);
    } catch (error) {
      throw error;
    }
  }

  async updateSchedule(id: number, data: UpdateScheduleDto) {
    try {
      const schedule = await this.scheduleRepository.findOne({
        where: { id },
      });

      if (!schedule) {
        throw new NotFoundException('Schedule not found');
      }

      const movie = await this.movieRepository.findOne({
        where: { id: data.movieId },
      });

      if (!movie) {
        throw new NotFoundException('Movie not found');
      }

      const theater = await this.theaterRepository.findOne({
        where: { id: data.theaterId },
      });

      if (!theater) {
        throw new NotFoundException('Theater not found');
      }

      await this.scheduleRepository.update(id, data);

      return this.scheduleRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteSchedule(id: number) {
    try {
      const schedule = await this.scheduleRepository.findOne({
        where: { id },
      });

      if (!schedule) {
        throw new NotFoundException('Schedule not found');
      }

      await this.scheduleRepository.delete(id);

      return 'true';
    } catch (error) {
      throw error;
    }
  }
}
