import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CinemaSystem } from '../CinemaSystem/cinemaSystem.model';
import { CinemaComplex } from './cinemaComplex.model';
import { CreateCinemaComplex } from './dto/createCinemaComplex.dto';
import { UpdateCinemaComplex } from './dto/updateCinemaComplex.dto';

@Injectable()
export class CinemaComplexService {
  constructor(
    @InjectRepository(CinemaComplex)
    private cinemaComplexRepository: Repository<CinemaComplex>,

    @InjectRepository(CinemaSystem)
    private cinemaSystemRepository: Repository<CinemaSystem>,
  ) {}

  async findAllCinemaComplex() {
    try {
      return await this.cinemaComplexRepository.find({
        relations: { theaters: true },
      });
    } catch (error) {
      throw error;
    }
  }

  async findCinemaComplexById(id: number) {
    try {
      const cinemaComplex = await this.cinemaComplexRepository.findOne({
        where: { id },
        relations: { cinemaSystem: true, theaters: true },
      });

      if (!cinemaComplex) {
        throw new NotFoundException('Cinema complex not found');
      }

      return cinemaComplex;
    } catch (error) {
      throw error;
    }
  }

  async createCinemaComplex(data: CreateCinemaComplex) {
    try {
      const cinemaSystem = await this.cinemaSystemRepository.findOne({
        where: { id: data.cinemaSystemId },
      });

      if (!cinemaSystem) {
        throw new NotFoundException('Cinema system not found');
      }

      return await this.cinemaComplexRepository.save(data);
    } catch (error) {
      throw error;
    }
  }

  async updateCinemaComplex(id: number, data: UpdateCinemaComplex) {
    try {
      const cinemaComplex = await this.cinemaComplexRepository.findOne({
        where: { id },
      });

      if (!cinemaComplex) {
        throw new NotFoundException('Cinema complex not found');
      }

      const cinemaSystem = await this.cinemaSystemRepository.findOne({
        where: { id: data.cinemaSystemId },
      });

      if (!cinemaSystem) {
        throw new NotFoundException('Cinema system not found');
      }

      await this.cinemaComplexRepository.update(id, data);

      return await this.cinemaComplexRepository.findOne({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async deleteCinemaComplex(id: number) {
    try {
      const cinemaComplex = await this.cinemaComplexRepository.findOne({
        where: { id },
      });

      if (!cinemaComplex) {
        throw new NotFoundException('Cinema complex not found');
      }

      await this.cinemaComplexRepository.delete(id);

      return 'true';
    } catch (error) {
      throw error;
    }
  }
}
