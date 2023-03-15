import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookingTicket } from '../BookingTicket/bookingTicket.model';
import { Movie } from '../Movie/movie.model';
import { Seat } from '../Seat/seat.model';
import { Theater } from '../Theater/theater.model';

@Entity({ name: 'schedules' })
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'ngay_gio_chieu',
  })
  ngayGioChieu: Date;

  @Column({
    name: 'movie_id',
  })
  movieId: number;

  @Column({
    name: 'theater_id',
  })
  theaterId: number;

  // movies N - N theaters
  @ManyToOne(() => Movie, (movie) => movie.schedules, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'movie_id',
  })
  movie: Movie;

  @ManyToOne(() => Theater, (theater) => theater.schedules, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'theater_id',
  })
  theater: Theater;

  // schedules 1 - N seats
  @OneToMany(() => Seat, (seat) => seat.schedule, { onDelete: 'CASCADE' })
  seats: Seat[];

  // User N - N Schedule though bookingTicket
  @OneToMany(() => BookingTicket, (bookingTicket) => bookingTicket.Schedule, {
    onDelete: 'CASCADE',
  })
  bookingTicket: BookingTicket;
}
