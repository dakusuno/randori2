import {  IsNotEmpty, Length, IsMongoId, IsPhoneNumber } from 'class-validator';

export class CreateCustomerDto {

  @IsNotEmpty() 
  name: string;

  @IsPhoneNumber("ID") 
  phone_number: string;

  merchant: string;
}