import { IsNotEmpty, IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class PaymentOrderDto{

    @IsNumber()
    @Type(() => Number)
    nominal_payment:Number

}
