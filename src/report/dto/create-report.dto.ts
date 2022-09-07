import {  IsNotEmpty, Length, IsMongoId, IsDate, IsOptional, ValidateIf, Allow, IsDateString } from 'class-validator';

export class CreateReportDto{

  @IsNotEmpty() 
  detail: string;

  @IsNotEmpty() 
  price: number;

  @IsMongoId()
  @ValidateIf((object, value) => value !== "0")
  order: string;

  @IsMongoId()
  merchant: string;

  @IsNotEmpty()
  type_report:boolean

  @IsNotEmpty()
  is_order:boolean

  @IsDateString()
  date:Date
}