import { IsEmail, IsNotEmpty, Length, IsMobilePhone, IsString, IsNumber, IsPhoneNumber } from 'class-validator';

export class RegisterAuthDto {
  id:string;

  @IsNotEmpty() 
  username: string;

  @IsEmail()
  email:string;

  @IsNotEmpty()
  @Length(8, 12) 
  password: string;

  @IsPhoneNumber("US")
  phone_number: string;

  @IsString()
  name: string;

}