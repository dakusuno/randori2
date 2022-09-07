import {  IsNotEmpty, Length, IsMongoId } from 'class-validator';

export class DeletePackageDto {

  @IsNotEmpty() 
  id: string;

}