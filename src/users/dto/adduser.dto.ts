import { IsEmail, IsNotEmpty, Length, IsMobilePhone, IsString, IsNumber, IsPhoneNumber } from 'class-validator';

export class AddUserDto {
  id:string;

  @IsNotEmpty()
  @Length(6, 12) 
  username: string;

  @IsEmail()
  email:string;

  @IsNotEmpty()
  @Length(8, 12) 
  password: string;

  @IsPhoneNumber("ID")
  phone_number: string;

  @IsString()
  name: string;

}