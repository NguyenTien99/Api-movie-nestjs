import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Movie } from '../Movie/movie.model';

@Entity({ name: 'banners' })
export class Banner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'hinh_anh',
    nullable: true,
  })
  hinhAnh: string;

  // banners N - 1 movies
  @Column({
    name: 'movie_id',
  })
  movieId: number;
  @ManyToOne(() => Movie, (movie) => movie.banners)
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;
}
