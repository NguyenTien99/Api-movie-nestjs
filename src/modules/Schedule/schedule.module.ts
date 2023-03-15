import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from '../Movie/movie.model';
import { Theater } from '../Theater/theater.model';
import { ScheduleController } from './schedule.controller';
import { Schedule } from './schedule.model';
import { ScheduleService } from './schedule.service';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, Movie, Theater])],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
