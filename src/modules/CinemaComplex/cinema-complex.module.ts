import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CinemaSystem } from '../CinemaSystem/cinemaSystem.model';
import { CinemaComplexController } from './cinema-complex.controller';
import { CinemaComplexService } from './cinema-complex.service';
import { CinemaComplex } from './cinemaComplex.model';

@Module({
  imports: [TypeOrmModule.forFeature([CinemaComplex, CinemaSystem])],
  controllers: [CinemaComplexController],
  providers: [CinemaComplexService],
})
export class CinemaComplexModule {}
