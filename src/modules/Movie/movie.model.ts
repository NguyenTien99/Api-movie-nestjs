import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm';
import { Banner } from '../Banner/banner.model';
import { Schedule } from '../Schedule/schedule.model';

@Entity({ name: 'movies' })
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'ten_phim',
  })
  tenPhim: string;

  @Column({
    nullable: true,
  })
  trailer: string;

  @Column({
    name: 'hinh_anh',
    nullable: true,
  })
  hinhAnh: string;

  @Column({
    name: 'mo_ta',
    nullable: true,
  })
  moTa: string;

  @Column({
    name: 'ngay_khoi_chieu',
    nullable: true,
  })
  ngayKhoiChieu: Date;

  @Column({
    name: 'danh_gia',
    nullable: true,
  })
  danhGia: number;

  @Column({
    type: Boolean,
    nullable: true,
  })
  hot: boolean;

  @Column({
    name: 'dang_chieu',
    type: Boolean,
    nullable: true,
  })
  dangChieu: boolean;

  @Column({
    name: 'sap_chieu',
    type: Boolean,
    nullable: true,
  })
  sapChieu: boolean;

  @OneToMany(() => Banner, (banner) => banner.movie)
  banners: Banner[];

  @OneToMany(() => Schedule, (schedule) => schedule.movie, {
    onDelete: 'CASCADE',
  })
  schedules: Schedule[];
}
