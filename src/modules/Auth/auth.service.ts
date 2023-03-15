import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { comparePassword } from 'src/utils/bcrypt';
import { QueryFailedError, Repository } from 'typeorm';
import { User } from '../User/user.model';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private jwtService: JwtService,
  ) {}

  async login(credentials: LoginDto) {
    try {
      const { email, matKhau } = credentials;
      const user = await this.userRepository.findOne({
        where: { email },
      });

      if (!user) {
        throw new BadRequestException('Email hoặc mật khẩu không đúng');
      }

      const matchPassword = comparePassword(matKhau, user.matKhau);
      if (!matchPassword) {
        throw new BadRequestException('Email or password invalid');
      }

      return {
        accessToken: this.jwtService.sign({ email }),
        expiresIn: 60 * 60 * 24 * 7,
      };
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new InternalServerErrorException();
      }

      throw error;
    }
  }
}
