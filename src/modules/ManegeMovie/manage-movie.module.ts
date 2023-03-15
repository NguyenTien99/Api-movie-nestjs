import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banner } from '../Banner/banner.model';
import { Movie } from '../Movie/movie.model';
import { ManageMovieController } from './manage-movie.controller';
import { ManageMovieService } from './manage-movie.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Banner])],
  controllers: [ManageMovieController],
  providers: [ManageMovieService],
})
export class ManageMovieModule {}
