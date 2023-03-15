export interface ListSeat {
  seatId: number;
}

export interface BookingTicketDto {
  userId: number;
  scheduleId: number;
  listSeat: ListSeat[];
}
