import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  AfterInsert,
  BeforeInsert,
  AfterLoad,
} from 'typeorm';
import { BookingTicket } from '../BookingTicket/bookingTicket.model';
import { UserRole } from './dto/user.dto';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'email',
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    name: 'mat_khau',
  })
  matKhau: string;

  @Column({
    name: 'ho_ten',
    nullable: true,
  })
  hoTen: string;

  @Column({
    name: 'so_dt',
    nullable: true,
  })
  soDt: string;

  @Column({
    name: 'loai_nguoi_dung',
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  loaiNguoiDung: UserRole;

  @Column({
    name: 'avatar',
    nullable: true,
  })
  avatar: string;

  // User N - N Schedule though bookingTicket
  @OneToMany(() => BookingTicket, (bookingTicket) => bookingTicket.User, {
    onDelete: 'CASCADE',
  })
  bookingTickets: BookingTicket[];
}
