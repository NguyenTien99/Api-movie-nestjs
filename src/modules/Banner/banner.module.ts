import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from '../Movie/movie.model';
import { BannerController } from './banner.controller';
import { Banner } from './banner.model';
import { BannerService } from './banner.service';

@Module({
  imports: [TypeOrmModule.forFeature([Banner, Movie])],
  controllers: [BannerController],
  providers: [BannerService],
})
export class BannerModule {}
