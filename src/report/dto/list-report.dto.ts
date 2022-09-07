import {  IsNotEmpty, Length, IsMongoId, IsDate, IsOptional, ValidateIf, Allow, IsDateString } from 'class-validator';

export class ListReportDto{
  @IsDateString()
  date:Date
}