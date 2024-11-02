import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsEnum } from 'class-validator';

export class LoginDto {
 
  @IsEmail()
  email: string;

  @IsString()
  password: string; // Add password validation

}