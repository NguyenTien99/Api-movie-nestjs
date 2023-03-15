import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from 'src/utils/bcrypt';
import { FindOperator, Like, Repository } from 'typeorm';
import { User } from '../User/user.model';
import { CreatedUserDto } from './dto/createdUser.dto';
import { PagingUserDto } from './dto/pagingUser.dto';
import { FilterRoleUser } from './dto/searchRoleUser.dto';
import { SearchUserDto } from './dto/searchUser.dto';
import { UpdatedUserDto } from './dto/updatedUser.dto';

@Injectable()
export class ManageUserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAllUser() {
    try {
      const users = await this.userRepository.find();

      users.forEach((user) => {
        delete user.matKhau;
      });

      return users;
    } catch (error) {
      throw error;
    }
  }

  async pagingUser(paging: PagingUserDto) {
    try {
      const { page, pageSize } = paging;

      const total = await this.userRepository.count();

      const users = await this.userRepository.find({
        take: pageSize || 10,
        skip: (page - 1) * pageSize || 0,
      });

      users.forEach((user) => {
        delete user.matKhau;
      });

      return {
        data: users,
        paging: {
          total,
          page: page || 1,
          pageSize: pageSize || 10,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async searchUserByName(query: SearchUserDto) {
    try {
      const users = await this.userRepository.find({
        where: { hoTen: Like('%' + query.hoTen + '%') },
      });

      if (!users || users.length === 0) {
        throw new NotFoundException('User not found');
      }

      users.forEach((user) => {
        delete user.matKhau;
      });

      return users;
    } catch (error) {
      throw error;
    }
  }

  async filterRoleUser(query: FilterRoleUser) {
    try {
      const users = await this.userRepository.find({
        where: { loaiNguoiDung: query.role },
      });

      if (!users || users.length === 0) {
        throw new NotFoundException('User not found');
      }

      return users;
    } catch (error) {
      throw error;
    }
  }

  async findUserWithCondition(condition: Record<string, unknown>) {
    try {
      const user = await this.userRepository.findOne({ where: condition });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      delete user.matKhau;

      return user;
    } catch (error) {
      throw error;
    }
  }

  async createUser(data: CreatedUserDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: data.email },
      });

      if (user) {
        throw new BadRequestException('Email existed');
      }

      const matKhau = hashPassword(data.matKhau);

      const newUser = this.userRepository.create({ ...data, matKhau });
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id: number, data: UpdatedUserDto) {
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

  async deleteUser(id: number) {
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

  async uploadAvatar(id, file) {
    try {
      if (!file) {
        throw new BadRequestException('Please upload file');
      }

      const user = await this.userRepository.findOne({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const url = `http://localhost:3000/${file.path}`;

      await this.userRepository.update(id, { ...user, avatar: url });

      return await this.userRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }
}
