import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll() {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findById(id: number) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async create(data: UserDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: data.email },
      });

      if (user) {
        throw new BadRequestException('Email existed');
      }

      return await this.userRepository.save(data);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, data: UserDto) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const checkEmail = await this.userRepository.findOne({
        where: { email: data.email },
      });

      if (checkEmail && user.email !== data.email) {
        throw new BadRequestException('Email existed');
      }

      await this.userRepository.update(id, data);

      return await this.userRepository.findOne({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      await this.userRepository.delete(id);

      return 'true';
    } catch (error) {
      throw error;
    }
  }
}
