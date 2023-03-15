import { SeatDto } from './seat.dto';

export interface CreateTicketDto {
  userId: number;
  scheduleId: number;
  seats: SeatDto[];
}
