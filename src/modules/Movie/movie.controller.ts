import { Controller } from '@nestjs/common';
import {
  Body,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common/decorators';
import { MovieDto } from './dto/movie.dto';

import { MovieService } from './movie.service';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  getMovies() {
    return this.movieService.getMovies();
  }

  @Get('/:id')
  getMovieById(@Param('id') id: number) {
    return this.movieService.getMovieById(id);
  }

  @Post()
  @HttpCode(201)
  createMovie(@Body() data: MovieDto) {
    return this.movieService.createMovie(data);
  }

  @Put('/:id')
  updateMovie(@Param('id') id: number, @Body() data: MovieDto) {
    return this.movieService.updateMovie(id, data);
  }

  @Delete('/:id')
  deleteMovie(@Param('id') id: number) {
    return this.movieService.deleteMovie(id);
  }
}
