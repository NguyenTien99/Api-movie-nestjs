import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/:id')
  findById(@Param('id') id: number) {
    return this.userService.findById(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() data: UserDto) {
    if (!Object.keys(data).length) {
      throw new BadRequestException('Missing data');
    }

    return this.userService.create(data);
  }

  @Put('/:id')
  update(@Param('id') id: number, @Body() data: UserDto) {
    if (!Object.keys(data).length) {
      throw new BadRequestException('Missing data');
    }

    return this.userService.update(id, data);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
