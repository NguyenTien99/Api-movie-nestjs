import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingTicket } from '../BookingTicket/bookingTicket.model';
import { Movie } from '../Movie/movie.model';
import { Schedule } from '../Schedule/schedule.model';
import { Seat } from '../Seat/seat.model';
import { Theater } from '../Theater/theater.model';
import { User } from '../User/user.model';
import { BookingTicketDto } from './dto/bookingTicket.dto';
import { TaoLichChieuDto } from './dto/taoLichChieu.dto';

@Injectable()
export class ManageTicketService {
  constructor(
    @InjectRepository(BookingTicket)
    private ticketRepository: Repository<BookingTicket>,

    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,

    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,

    @InjectRepository(Theater)
    private theaterRepository: Repository<Theater>,
  ) {}

  async datVe(data: BookingTicketDto) {
    const { listSeat, ...payload } = data;

    const user = await this.userRepository.findOne({
      where: { id: data.userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const schedule = await this.scheduleRepository.findOne({
      where: { id: data.scheduleId },
    });

    if (!schedule) {
      throw new NotFoundException('Schedule not found');
    }

    listSeat.forEach((seat) => {
      (async () => {
        const checkSeat = await this.seatRepository.findOne({
          where: { id: seat.seatId },
        });

        if (!checkSeat) {
          throw new NotFoundException('Seat not found');
        }

        await this.seatRepository.update(seat.seatId, { daDat: true });
      })();
    });

    return await this.ticketRepository.save(data);
  }

  async layDanhSachPhongVe(maLichChieu: number) {
    try {
      const schedule = await this.scheduleRepository.findOne({
        where: { id: maLichChieu },
        relations: { movie: true, theater: true, seats: true },
      });

      if (!schedule) {
        throw new NotFoundException('Schedule not found');
      }
      return schedule;
    } catch (error) {
      throw error;
    }
  }

  async taoLichChieu(data: TaoLichChieuDto) {
    try {
      const movie = await this.movieRepository.findOne({
        where: { id: data.movieId },
      });

      if (!movie) {
        throw new NotFoundException('Movie not found');
      }

      const theater = await this.theaterRepository.findOne({
        where: { id: data.theaterId },
      });

      if (!theater) {
        throw new NotFoundException('Schedule not found');
      }

      return await this.scheduleRepository.save(data);
    } catch (error) {
      throw error;
    }
  }
}
