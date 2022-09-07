import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { mongoose, ReturnModelType } from '@typegoose/typegoose';
import { Model } from 'mongoose';
import { Merchant } from './model/merchant.model';

@Injectable()
export class MerchantService {
    constructor(@InjectModel(Merchant.name) private readonly merchantModel: Model<Merchant>) { }

    public async Create(body): Promise<any> {
        try {
            return await new this.merchantModel(body).save()
        } catch (error) {
            throw await new UnauthorizedException(error)
        }
    }

    public async All(request): Promise<any> {
        try {
            return await this.merchantModel
                .find({ user: request })
                .sort({ 'createdAt': 'asc' })
        } catch (error) {
            throw await new UnauthorizedException(error)
        }
    }

    public async Update(body): Promise<any> {
        try {
            return await this.merchantModel.findOneAndUpdate({ _id: body._id, user: body.user }, body)
        } catch (error) {
            throw await new UnauthorizedException(error)
        }
    }

    public async Remove(request, param): Promise<any> {
        try {
            return await this.merchantModel.findOneAndDelete({ _id: param, user: request })
        } catch (error) {
            throw await new UnauthorizedException(error)
        }
    }
    public async Detail(request, id): Promise<any> {
        try {
            return await this.merchantModel.findOne({ _id: id })
        } catch (error) {
            throw await new UnauthorizedException(error)
        }
    }
    public async isExist(id: string, user: string) {
        try {
            return await this.merchantModel.findOne({ _id: new mongoose.Types.ObjectId(id), user: new mongoose.Types.ObjectId(user) }).then((res) => {
                if (res != undefined) {
                    return true
                }
                else {
                    return false
                }
            })
                .catch(err => {
                    throw new UnauthorizedException(err);
                })
        } catch (error) {
            throw new UnauthorizedException(error);
        }
    }
}
