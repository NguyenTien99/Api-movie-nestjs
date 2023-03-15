import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Schedule } from '../Schedule/schedule.model';
import { Seat } from '../Seat/seat.model';
import { User } from '../User/user.model';

@Entity({ name: 'booking_ticket' })
export class BookingTicket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'user_id',
  })
  userId: number;

  @Column({
    name: 'schedule_id',
  })
  scheduleId: number;

  // User N - N Schedule though bookingTicket
  @ManyToOne(() => User, (user) => user.bookingTickets, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
  })
  User: User;

  @ManyToOne(() => Schedule, (schedule) => schedule, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'schedule_id',
  })
  Schedule: Schedule;
}
