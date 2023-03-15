import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CinemaSystemController } from './cinema-system.controller';
import { CinemaSystemService } from './cinema-system.service';
import { CinemaSystem } from './cinemaSystem.model';

@Module({
  imports: [TypeOrmModule.forFeature([CinemaSystem])],
  controllers: [CinemaSystemController],
  providers: [CinemaSystemService],
})
export class CinemaSystemModule {}
