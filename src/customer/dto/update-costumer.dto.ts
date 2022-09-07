import { IsNotEmpty, IsMongoId, IsPhoneNumber } from "class-validator";

export class UpdateCostumerDto{
    name:string;

    @IsPhoneNumber("ID")
    phone_number: string;

}