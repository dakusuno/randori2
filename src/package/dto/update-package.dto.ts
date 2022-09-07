import {  IsNotEmpty, Length, IsMongoId } from 'class-validator';

export class UpdatePackageDto {

  @IsNotEmpty() 
  name: string;

  @IsNotEmpty() 
  unit: boolean;

  @IsNotEmpty() 
  detail: string;

  @IsNotEmpty() 
  price: number;

  @IsNotEmpty()
  duration:number

  @IsNotEmpty() 
  _id: string;

  @IsMongoId()
  merchant:string

}