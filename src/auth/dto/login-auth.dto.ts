import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginAuthDto {
  id:string;

  @IsNotEmpty() 
  username: string;

  @IsNotEmpty()
  @Length(8, 12) 
  password: string;

}