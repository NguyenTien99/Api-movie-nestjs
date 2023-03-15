import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CinemaComplex } from '../CinemaComplex/cinemaComplex.model';

@Entity({ name: 'cinema_system' })
export class CinemaSystem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'ten_he_thong_rap',
  })
  tenHeThongRap: string;

  @Column({
    name: 'logo',
    nullable: true,
  })
  logo: string;

  // cinema_system 1 - N cinema_complex
  @OneToMany(() => CinemaComplex, (cinemaComplex) => cinemaComplex.cinemaSystem)
  cinemaComplex: CinemaComplex[];
}
