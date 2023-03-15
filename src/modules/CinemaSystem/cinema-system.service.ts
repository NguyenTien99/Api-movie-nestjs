import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { url } from 'inspector';
import { Repository } from 'typeorm';
import { CinemaSystem } from './cinemaSystem.model';
import { createCinemaSystem } from './dto/createCinemaSystem.dto';
import { UpdateCinemaSystem } from './dto/updateCinemSystem.dto';

@Injectable()
export class CinemaSystemService {
  constructor(
    @InjectRepository(CinemaSystem)
    private cinemaSystemRepository: Repository<CinemaSystem>,
  ) {}

  async findAllCinemaSystem() {
    try {
      return await this.cinemaSystemRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findCinemaSystem(id: number) {
    try {
      const cinemaSystem = await this.cinemaSystemRepository.findOne({
        where: { id },
        relations: { cinemaComplex: true },
      });

      if (!cinemaSystem) {
        throw new NotFoundException('Cinema system not found');
      }

      return cinemaSystem;
    } catch (error) {
      throw error;
    }
  }

  async createCinemaSystem(data: createCinemaSystem) {
    try {
      return await this.cinemaSystemRepository.save(data);
    } catch (error) {
      throw error;
    }
  }

  async updateCinemaSystem(id: number, data: UpdateCinemaSystem) {
    try {
      const cinemaSystem = await this.cinemaSystemRepository.findOne({
        where: { id },
      });

      if (!cinemaSystem) {
        throw new NotFoundException('Cinema system not found');
      }

      await this.cinemaSystemRepository.update(id, data);

      return this.cinemaSystemRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteCinemaSystem(id: number) {
    try {
      const cinemaSystem = await this.cinemaSystemRepository.findOne({
        where: { id },
      });

      if (!cinemaSystem) {
        throw new NotFoundException('Cinema system not found');
      }

      await this.cinemaSystemRepository.delete(id);

      return 'true';
    } catch (error) {
      throw error;
    }
  }

  async uploadLogoCinema(id: number, file: any) {
    try {
      if (!file) {
        throw new BadRequestException('Please upload file');
      }

      const cinemaSystem = await this.cinemaSystemRepository.findOne({
        where: { id },
      });

      if (!cinemaSystem) {
        throw new NotFoundException('Cinema system not found');
      }

      const url = `http://localhost:3000/${file.path}`;

      await this.cinemaSystemRepository.update(id, {
        ...cinemaSystem,
        logo: url,
      });

      return this.cinemaSystemRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }
}
