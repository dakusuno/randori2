import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {  Costumer, CustomerDocument } from './model/costumer.model';
import { CreateCustomerDto } from './dto/create-costumer.dto';
import { UpdateCostumerDto } from './dto/update-costumer.dto';
import { Model } from 'mongoose';
import { MerchantService } from 'src/merchant/merchant.service';

@Injectable()
export class CostumerService {
    constructor(@InjectModel(Costumer.name) private customerModel: Model<CustomerDocument>,private merchantService:MerchantService) {}

    public async create(input: CreateCustomerDto, param) {
        if (this.merchantService.isExist(input.merchant, param.id)) {
            try {
                return await new this.customerModel(input).save()
            } catch (error) {
                throw await new UnauthorizedException(error)
            }
        }
   }

    public async find(input: string, param) {
        if (this.merchantService.isExist(input, param.id)) {

            try {
                return await this.customerModel
                .find({ merchant: input })
                .sort({ 'createdAt': 'asc' })
            } catch (error) {
                throw await new UnauthorizedException(error)
            }
        }

    }

    public async update(input: UpdateCostumerDto, id: string, merchant: string, request) {
        if (this.merchantService.isExist(merchant, request.id)) {

            try {
                return await this.customerModel
                .findOneAndUpdate({ _id: id, merchant: merchant }, input)
            } catch (error) {
                throw await new UnauthorizedException(error)
            }
        }
    }

    public async delete(merchant: string, id: String, request) {
        if (this.merchantService.isExist(merchant, request.id)) {

            try {
                return await this.customerModel
                .findOneAndDelete({ _id: id, merchant: merchant })
            } catch (error) {
                throw await new UnauthorizedException(error)
            }
        }
    }
}
