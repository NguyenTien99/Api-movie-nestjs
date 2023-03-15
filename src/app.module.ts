import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import { MulterModule } from '@nestjs/platform-express/multer';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dirname, join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/Auth/auth.module';
import { Banner } from './modules/Banner/banner.model';
import { BannerModule } from './modules/Banner/banner.module';
import { BookingTicketModule } from './modules/BookingTicket/booking-ticket.module';
import { BookingTicket } from './modules/BookingTicket/bookingTicket.model';
import { CinemaComplexModule } from './modules/CinemaComplex/cinema-complex.module';
import { CinemaComplex } from './modules/CinemaComplex/cinemaComplex.model';
import { CinemaSystemModule } from './modules/CinemaSystem/cinema-system.module';
import { CinemaSystem } from './modules/CinemaSystem/cinemaSystem.model';
import { ManageCinemaModule } from './modules/ManageCinema/manage-cinema.module';
import { ManageTicketModule } from './modules/ManageTicket/manage-ticket.module';
import { ManageUserModule } from './modules/ManageUser/manage-user.module';
import { ManageMovieModule } from './modules/ManegeMovie/manage-movie.module';
import { Movie } from './modules/Movie/movie.model';
import { MovieModule } from './modules/Movie/movie.module';
import { Schedule } from './modules/Schedule/schedule.model';
import { ScheduleModule } from './modules/Schedule/schedule.module';
import { Seat } from './modules/Seat/seat.model';
import { SeatModule } from './modules/Seat/seat.module';
import { Theater } from './modules/Theater/theater.model';
import { TheaterModule } from './modules/Theater/theater.module';
import { User } from './modules/User/user.model';
import { UserModule } from './modules/User/user.module';

const AppDataSource = TypeOrmModule.forRootAsync({
  useFactory: (config: ConfigService) => ({
    type: 'mysql',
    host: config.get('MYSQL_HOST'),
    port: config.get('MYSQL_PORT'),
    username: config.get('MYSQL_USER'),
    password: config.get('MYSQL_PASSWORD'),
    database: config.get('MYSQL_DATABASE'),
    synchronize: true,
    entities: [
      User,
      Movie,
      Banner,
      Schedule,
      BookingTicket,
      Theater,
      Seat,
      CinemaComplex,
      CinemaSystem,
    ],
  }),
  inject: [ConfigService],
});

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AppDataSource,
    MulterModule.register({ dest: './uploads' }),
    AuthModule,
    UserModule,
    MovieModule,
    BannerModule,
    TheaterModule,
    SeatModule,
    BookingTicketModule,
    ScheduleModule,
    CinemaSystemModule,
    CinemaComplexModule,
    ManageTicketModule,
    ManageCinemaModule,
    ManageMovieModule,
    ManageUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
