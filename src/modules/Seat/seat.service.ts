import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from '../Schedule/schedule.model';
import { CreateSeatDto } from './dto/createSeat.dto';
import { UpdateSeatDto } from './dto/updateSeat.dto';
import { Seat } from './seat.model';

@Injectable()
export class SeatService {
  constructor(
    @InjectRepository(Seat) private seatRepository: Repository<Seat>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async findAllSeat() {
    try {
      return await this.seatRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findSeatById(id) {
    try {
      const seat = await this.seatRepository.findOne({ where: { id } });
      if (!seat) {
        throw new NotFoundException('Seat not found');
      }

      return seat;
    } catch (error) {
      throw error;
    }
  }

  async createSeat(data: CreateSeatDto) {
    try {
      const schedule = await this.scheduleRepository.findOne({
        where: { id: data.scheduleId },
      });

      if (!schedule) {
        throw new NotFoundException('Schedule not found');
      }

      return await this.seatRepository.save(data);
    } catch (error) {
      throw error;
    }
  }

  async updateSeat(id: number, data: UpdateSeatDto) {
    try {
      const seat = await this.seatRepository.findOne({ where: { id } });

      if (!seat) {
        throw new NotFoundException('Seat not found');
      }

      const schedule = await this.scheduleRepository.findOne({
        where: { id: data.scheduleId },
      });

      if (!schedule) {
        throw new NotFoundException('Schedule not found');
      }

      await this.seatRepository.update(id, data);

      return await this.seatRepository.findOne({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async deleteSeat(id: number) {
    try {
      const seat = await this.seatRepository.findOne({ where: { id } });
      if (!seat) {
        throw new NotFoundException('Seat not found');
      }

      await this.seatRepository.delete(id);

      return 'true';
    } catch (error) {
      throw error;
    }
  }
}
