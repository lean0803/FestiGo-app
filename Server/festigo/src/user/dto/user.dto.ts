import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateUsernameDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'Username harus memiliki minimal 3 karakter' })
  username: string;
}

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password harus memiliki minimal 6 karakter' })
  password: string;
}
