import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreatedUserDto } from '../ManageUser/dto/createdUser.dto';
import { ManageUserService } from '../ManageUser/manage-user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: ManageUserService,
  ) {}

  @Post('/dangNhap')
  login(@Body() credentials: LoginDto) {
    return this.authService.login(credentials);
  }

  @Post('/DangKi')
  register(@Body() data: CreatedUserDto) {
    return this.userService.createUser(data);
  }

  @Get('/profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
