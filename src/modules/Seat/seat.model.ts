import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookingTicket } from '../BookingTicket/bookingTicket.model';
import { Schedule } from '../Schedule/schedule.model';

@Entity({ name: 'seats' })
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'ten_ghe',
  })
  tenGhe: string;

  @Column({
    name: 'loai_ghe',
  })
  loaiGhe: string;

  @Column({
    name: 'gia_ve',
  })
  giaVe: number;

  @Column({
    name: 'da_dat',
    default: false,
    nullable: true,
  })
  daDat: boolean;

  @Column({
    name: 'schedule_id',
  })
  scheduleId: number;

  // seats N - 1 schedules
  @ManyToOne(() => Schedule, (schedule) => schedule.seats)
  @JoinColumn({
    name: 'schedule_id',
  })
  schedule: Schedule;
}
