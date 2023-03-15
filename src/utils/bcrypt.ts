import * as bcrypt from 'bcrypt';

export function hashPassword(password: string) {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
}

export function comparePassword(password: string, hashPassword: string) {
  return bcrypt.compareSync(password, hashPassword);
}
