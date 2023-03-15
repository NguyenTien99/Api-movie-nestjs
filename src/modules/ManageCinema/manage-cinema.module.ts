import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CinemaComplex } from '../CinemaComplex/cinemaComplex.model';
import { CinemaSystem } from '../CinemaSystem/cinemaSystem.model';
import { Movie } from '../Movie/movie.model';
import { Schedule } from '../Schedule/schedule.model';
import { Theater } from '../Theater/theater.model';
import { ManageCinemaController } from './manage-cinema.controller';
import { ManageCinemaService } from './manage-cinema.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CinemaSystem,
      CinemaComplex,
      Theater,
      Schedule,
      Movie,
    ]),
  ],
  controllers: [ManageCinemaController],
  providers: [ManageCinemaService],
})
export class ManageCinemaModule {}
