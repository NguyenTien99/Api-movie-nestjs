import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CinemaComplex } from '../CinemaComplex/cinemaComplex.model';
import { TheaterController } from './theater.controller';
import { Theater } from './theater.model';
import { TheaterService } from './theater.service';

@Module({
  imports: [TypeOrmModule.forFeature([Theater, CinemaComplex])],
  controllers: [TheaterController],
  providers: [TheaterService],
})
export class TheaterModule {}
