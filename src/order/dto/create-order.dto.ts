import {  IsNotEmpty, IsMongoId, IsNumber, IsOptional, IsEmpty } from 'class-validator';

export class CreateOrderDto {

    _id:String
    
    @IsNotEmpty() 
    quantity:number

    @IsOptional()
    @IsNumber()
    price:number

    @IsEmpty()
    transaction_code:String
    
    nominal_total:number
    
    nominal_payment:Number

    date_processed:Date

    date_predicted:Date

    date_completed:Date
    
    date_payment:Date

    @IsOptional()
    @IsNotEmpty()
    status_process:Boolean
    
    @IsOptional()
    @IsNotEmpty()
    status_payment:Boolean

    @IsNotEmpty()
    package: string

    @IsOptional()
    @IsMongoId()
    merchant: string

    @IsNotEmpty()
    costumer:string
}