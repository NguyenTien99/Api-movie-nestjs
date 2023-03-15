import { UserRole } from 'src/modules/User/dto/user.dto';

export interface UpdatedUserDto {
  email?: string;
  matKhau?: string;
  hoTen?: string;
  soDt?: string;
  loaiNguoiDung?: UserRole;
  avatar?: string;
}
