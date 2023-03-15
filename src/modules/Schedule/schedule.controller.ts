import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateScheduleDto } from './dto/createSchedule.dto';
import { UpdateScheduleDto } from './dto/updateSchedule.dto';
import { ScheduleService } from './schedule.service';

@Controller('schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get()
  findAllSchedule() {
    return this.scheduleService.findAllSchedule();
  }

  @Get('/:id')
  findScheduleByid(@Param('id') id: number) {
    return this.scheduleService.findScheduleById(id);
  }

  @Post()
  createSchedule(@Body() data: CreateScheduleDto) {
    return this.scheduleService.createSchedule(data);
  }

  @Put('/:id')
  updateSchedule(@Param('id') id: number, @Body() data: UpdateScheduleDto) {
    return this.scheduleService.updateSchedule(id, data);
  }

  @Delete('/:id')
  deleteSchedule(@Param('id') id: number) {
    return this.scheduleService.deleteSchedule(id);
  }
}
