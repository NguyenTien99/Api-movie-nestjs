import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingTicket } from '../BookingTicket/bookingTicket.model';
import { Movie } from '../Movie/movie.model';
import { Schedule } from '../Schedule/schedule.model';
import { Seat } from '../Seat/seat.model';
import { Theater } from '../Theater/theater.model';
import { User } from '../User/user.model';
import { ManageTicketController } from './manage-ticket.controller';
import { ManageTicketService } from './manage-ticket.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BookingTicket,
      Schedule,
      User,
      Seat,
      Movie,
      Theater,
    ]),
  ],
  controllers: [ManageTicketController],
  providers: [ManageTicketService],
})
export class ManageTicketModule {}
