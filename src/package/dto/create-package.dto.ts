import {  IsNotEmpty, Length,IsOptional, IsMongoId, ValidateIf } from 'class-validator';

export class CreatePackageDto {

  @IsNotEmpty() 
  name: string;

  @IsNotEmpty() 
  unit: boolean;

  @IsNotEmpty() 
  detail: string;

  @IsNotEmpty() 
  price: number;
  
  @IsMongoId()
  @IsOptional()
  merchant?: string;

  @IsNotEmpty()
  duration:number
}