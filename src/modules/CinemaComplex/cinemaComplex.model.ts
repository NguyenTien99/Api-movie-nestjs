import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CinemaSystem } from '../CinemaSystem/cinemaSystem.model';
import { Theater } from '../Theater/theater.model';

@Entity({ name: 'cinema_complex' })
export class CinemaComplex {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'ten_cum_rap',
  })
  tenCumRap: string;

  @Column({
    name: 'dia_chi',
  })
  diaChi: string;

  // cinema_complex N - 1 cinema system
  @Column({
    name: 'cinema_system_id',
  })
  cinemaSystemId: number;
  @ManyToOne(() => CinemaSystem, (cinemaSystem) => cinemaSystem.cinemaComplex)
  @JoinColumn({
    name: 'cinema_system_id',
  })
  cinemaSystem: CinemaSystem;

  // cinema_complex N - 1 theater
  @OneToMany(() => Theater, (theater) => theater.cinemaComplex)
  theaters: Theater[];
}
