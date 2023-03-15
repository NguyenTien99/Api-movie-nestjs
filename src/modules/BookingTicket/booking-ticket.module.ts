import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from '../Schedule/schedule.model';
import { Seat } from '../Seat/seat.model';
import { SeatService } from '../Seat/seat.service';
import { User } from '../User/user.model';
import { BookingTicketController } from './booking-ticket.controller';
import { BookingTicketService } from './booking-ticket.service';
import { BookingTicket } from './bookingTicket.model';

@Module({
  imports: [TypeOrmModule.forFeature([BookingTicket, User, Schedule, Seat])],
  controllers: [BookingTicketController],
  providers: [BookingTicketService, SeatService],
})
export class BookingTicketModule {}
