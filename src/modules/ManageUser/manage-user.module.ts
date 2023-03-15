import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../User/user.model';
import { ManageUserController } from './manage-user.controller';
import { ManageUserService } from './manage-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [ManageUserController],
  providers: [ManageUserService],
})
export class ManageUserModule {}
