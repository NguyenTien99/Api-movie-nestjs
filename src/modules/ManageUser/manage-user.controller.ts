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
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreatedUserDto } from './dto/createdUser.dto';
import { PagingUserDto } from './dto/pagingUser.dto';
import { FilterRoleUser } from './dto/searchRoleUser.dto';
import { SearchUserDto } from './dto/searchUser.dto';
import { UpdatedUserDto } from './dto/updatedUser.dto';
import { ManageUserService } from './manage-user.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('QuanLyNguoiDung')
export class ManageUserController {
  constructor(private readonly manageUserService: ManageUserService) {}

  @Get('/LayDanhSachNguoiDung')
  @UseGuards(AuthGuard('jwt'))
  findAllUser() {
    return this.manageUserService.findAllUser();
  }

  @Get('/LayThongTinNguoiDung/:id')
  @UseGuards(AuthGuard('jwt'))
  findUserById(@Param('id') id: number) {
    return this.manageUserService.findUserWithCondition({ id });
  }

  @Get('/LayDanhSachNguoiDungPhanTRang')
  @UseGuards(AuthGuard('jwt'))
  getPagingUsers(@Query() query: PagingUserDto) {
    return this.manageUserService.pagingUser(query);
  }

  @Get('/TimKiemNguoiDung')
  @UseGuards(AuthGuard('jwt'))
  searchUser(@Query() query: SearchUserDto) {
    return this.manageUserService.searchUserByName(query);
  }

  @Get('LayDanhSachLoaiNguoiDung')
  @UseGuards(AuthGuard('jwt'))
  getRoleUser(@Query() query: FilterRoleUser) {
    return this.manageUserService.filterRoleUser(query);
  }

  @Post('/TaoNguoiDung')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(201)
  createUser(@Body() data: CreatedUserDto) {
    if (!Object.keys(data).length) {
      throw new BadRequestException('Missing data');
    }

    return this.manageUserService.createUser(data);
  }

  @Post('/Avatar/:id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './static/avatar',
        filename: (req, file, cb) => {
          const prefix = Date.now() + '-' + Math.round(Math.random() * 1e9);

          cb(null, `${prefix}-${file.originalname}`);
        },
      }),
    }),
  )
  uploadAvatar(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.manageUserService.uploadAvatar(id, file);
  }

  @Put('/CapNhatNguoiDung/:id')
  @UseGuards(AuthGuard('jwt'))
  updateUser(@Param('id') id: number, @Body() data: UpdatedUserDto) {
    if (!Object.keys(data).length) {
      throw new BadRequestException('Missing data');
    }

    return this.manageUserService.updateUser(id, data);
  }

  @Delete('/XoaNguoiDung/:id')
  @UseGuards(AuthGuard('jwt'))
  deleteUser(@Param('id') id: number) {
    return this.manageUserService.deleteUser(id);
  }
}
