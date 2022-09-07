import {  IsNotEmpty, Length, IsMongoId, IsPhoneNumber } from 'class-validator';

export class CreateMerchantDto {



  @IsNotEmpty() 
  name: string;

  _id: string;

  @IsPhoneNumber("ID") 
  phone_number: string;

  user: string;

  @IsNotEmpty()
  address:string
}