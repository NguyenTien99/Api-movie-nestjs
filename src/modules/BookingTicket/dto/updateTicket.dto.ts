import { SeatDto } from './seat.dto';

export interface UpdateTicketDto {
  userId?: number;
  scheduleId?: number;
  seats?: SeatDto[];
}
