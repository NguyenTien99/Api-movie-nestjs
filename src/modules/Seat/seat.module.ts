import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from '../Schedule/schedule.model';
import { SeatController } from './seat.controller';
import { Seat } from './seat.model';
import { SeatService } from './seat.service';

@Module({
  imports: [TypeOrmModule.forFeature([Seat, Schedule])],
  controllers: [SeatController],
  providers: [SeatService],
})
export class SeatModule {}
