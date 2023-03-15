import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CinemaComplex } from '../CinemaComplex/cinemaComplex.model';
import { Schedule } from '../Schedule/schedule.model';

@Entity({ name: 'theaters' })
export class Theater {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'ten_rap',
  })
  tenRap: string;

  @Column({
    name: 'cinema_complex_id',
  })
  cinemaComplexId: number;
  // theater 1 - N cinemaComplex
  @ManyToOne(() => CinemaComplex, (cinemaComplex) => cinemaComplex)
  @JoinColumn({
    name: 'cinema_complex_id',
  })
  cinemaComplex: CinemaComplex;

  // movies N - N theater though schedule
  @OneToMany(() => Schedule, (schedule) => schedule.theater)
  schedules: Schedule[];
}
