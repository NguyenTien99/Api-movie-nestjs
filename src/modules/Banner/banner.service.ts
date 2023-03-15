import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../Movie/movie.model';
import { Banner } from './banner.model';
import { CreateBanner } from './dto/createBanner.dto';
import { UpdateBanner } from './dto/updateBanner.dto';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner) private bannerRepository: Repository<Banner>,
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
  ) {}

  async findAllBanner() {
    try {
      return await this.bannerRepository.find({ relations: { movie: true } });
    } catch (error) {
      throw error;
    }
  }

  async findBannerById(id: number) {
    try {
      const banner = await this.bannerRepository.findOne({
        where: { id },
        relations: { movie: true },
      });

      if (!banner) {
        throw new NotFoundException('Banner not found');
      }

      return banner;
    } catch (error) {
      throw error;
    }
  }

  async createBanner(data: CreateBanner) {
    try {
      const movie = await this.movieRepository.findOne({
        where: { id: data.movieId },
      });

      if (!movie) {
        throw new NotFoundException('Movie not found');
      }

      return await this.bannerRepository.save(data);
    } catch (error) {
      throw error;
    }
  }

  async updateBanner(id: number, data: UpdateBanner) {
    try {
      const banner = await this.bannerRepository.findOne({ where: { id } });

      if (!banner) {
        throw new NotFoundException('Banner not found');
      }

      const movie = await this.movieRepository.findOne({
        where: { id: data.movieId },
      });
      if (!movie) {
        throw new NotFoundException('Movie not found');
      }

      await this.bannerRepository.update(id, data);

      return await this.bannerRepository.findOne({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async deleteBanner(id: number) {
    try {
      const banner = await this.bannerRepository.findOne({ where: { id } });

      if (!banner) {
        throw new NotFoundException('Banner not found');
      }

      await this.bannerRepository.delete(id);

      return true;
    } catch (error) {
      throw error;
    }
  }

  async uploadBanner(id: number, file: any) {
    try {
      if (!file) {
        throw new BadRequestException('Please upload file');
      }

      const banner = await this.bannerRepository.findOne({ where: { id } });

      if (!banner) {
        throw new NotFoundException('Banner not found');
      }

      const url = `http://localhost:3000/${file.path}`;

      await this.bannerRepository.update(id, { ...banner, hinhAnh: url });

      return await this.bannerRepository.findOne({ where: { id } });
    } catch (error) {}
  }
}
