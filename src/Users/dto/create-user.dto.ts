import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsPhoneNumber('IN')
  phone_no: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string; // Add password validation

  @IsEnum(['customer', 'admin'])
  user_type: 'customer' | 'admin';
}