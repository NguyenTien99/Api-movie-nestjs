export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export interface UserDto {
  id: number;
  matKhau: string;
  email: string;
  soDt?: string;
  hoTen?: string;
  loaiNguoiDung: UserRole;
}
