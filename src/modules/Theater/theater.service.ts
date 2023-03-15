import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CinemaComplex } from '../CinemaComplex/cinemaComplex.model';
import { CreateTheater } from './dto/createTheater.dto';
import { UpdateTheater } from './dto/updateTheater.dto';
import { Theater } from './theater.model';

@Injectable()
export class TheaterService {
  constructor(
    @InjectRepository(Theater)
    private theaterRepository: Repository<Theater>,

    @InjectRepository(CinemaComplex)
    private cinemaComplexRepository: Repository<CinemaComplex>,
  ) {}

  async findAllTheater() {
    try {
      return this.theaterRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findTheaterById(id: number) {
    try {
      const theater = await this.theaterRepository.findOne({
        where: { id },
        relations: { cinemaComplex: true },
      });

      if (!theater) {
        throw new NotFoundException('Theater not found');
      }

      return theater;
    } catch (error) {
      throw error;
    }
  }

  async createTheater(data: CreateTheater) {
    try {
      const cinemaComplex = await this.cinemaComplexRepository.findOne({
        where: { id: data.cinemaComplexId },
      });

      if (!cinemaComplex) {
        throw new NotFoundException('Cinema complex not found');
      }

      return await this.theaterRepository.save(data);
    } catch (error) {
      throw error;
    }
  }

  async updateTheater(id: number, data: UpdateTheater) {
    try {
      const theater = await this.theaterRepository.findOne({
        where: { id },
      });

      if (!theater) {
        throw new NotFoundException('Theater not found');
      }

      const cinemaComplex = await this.cinemaComplexRepository.findOne({
        where: { id: data.cinemaComplexId },
      });

      if (!cinemaComplex) {
        throw new NotFoundException('Cinema complex not found');
      }

      await this.theaterRepository.update(id, data);

      return await this.theaterRepository.findOne({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async deleteTheater(id: number) {
    try {
      const theater = await this.theaterRepository.findOne({
        where: { id },
      });

      if (!theater) {
        throw new NotFoundException('Theater not found');
      }

      await this.theaterRepository.delete(id);
      return 'true';
    } catch (error) {
      throw error;
    }
  }
}
