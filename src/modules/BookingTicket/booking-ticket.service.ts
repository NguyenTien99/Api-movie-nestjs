import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from '../Schedule/schedule.model';
import { SeatService } from '../Seat/seat.service';
import { User } from '../User/user.model';
import { BookingTicket } from './bookingTicket.model';
import { UpdateTicketDto } from './dto';
import { CreateTicketDto } from './dto/createTicket.dto';

@Injectable()
export class BookingTicketService {
  constructor(
    @InjectRepository(BookingTicket)
    private bookingRepository: Repository<BookingTicket>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,

    private readonly seatService: SeatService,
  ) {}

  async findAllTicket() {
    try {
      return await this.bookingRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findTicketById(id: number) {
    try {
      const ticket = await this.bookingRepository.findOne({
        where: { id },
      });

      if (!ticket) {
        throw new NotFoundException('Ticket not found');
      }

      return ticket;
    } catch (error) {
      throw error;
    }
  }

  async createTicket(data: CreateTicketDto) {
    try {
      const { seats, ...payload } = data;

      const user = await this.userRepository.findOne({
        where: { id: payload.userId },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const schedule = await this.scheduleRepository.findOne({
        where: { id: payload.scheduleId },
      });

      if (!schedule) {
        throw new NotFoundException('Schedule not found');
      }

      seats.forEach((seat) => {
        this.seatService.updateSeat(seat.seatId, {
          daDat: true,
        });
      });

      return this.bookingRepository.save(payload);
    } catch (error) {
      throw error;
    }
  }

  async updateTicket(id: number, data: UpdateTicketDto) {
    try {
      const { seats, ...payload } = data;

      const user = await this.userRepository.findOne({
        where: { id: payload.userId },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const schedule = await this.scheduleRepository.findOne({
        where: { id: payload.scheduleId },
      });

      if (!schedule) {
        throw new NotFoundException('Schedule not found');
      }

      seats &&
        seats.forEach((seat) => {
          this.seatService.updateSeat(seat.seatId, { daDat: true });
        });

      await this.bookingRepository.update(id, payload);

      return await this.bookingRepository.findOne({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async deleteTicket(id: number) {
    try {
      const ticket = await this.bookingRepository.findOne({
        where: { id },
      });

      if (!ticket) {
        throw new NotFoundException('Ticket not found');
      }

      await this.bookingRepository.delete(id);

      return 'true';
    } catch (error) {
      throw error;
    }
  }
}
