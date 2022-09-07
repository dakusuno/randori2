import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Package} from './model/package.model';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { MerchantService } from 'src/merchant/merchant.service';
import { Model } from 'mongoose';

@Injectable()
export class PackageService {
    constructor(@InjectModel(Package.name) private readonly packageModel: Model<Package>, private readonly merchantService: MerchantService) {
    }

    public async create(input: CreatePackageDto, request) {
        if (this.merchantService.isExist(input.merchant, request.id)) {
            try {
                return await new this.packageModel(input).save()
            } catch (error) {
                throw await new UnauthorizedException(error)
            }
        }
    }
    public async list(merchant: string, request) {
        if (this.merchantService.isExist(merchant, request.id)) {

            try {
                return await this.packageModel.find({ merchant: merchant })
            } catch (error) {
                throw await new UnauthorizedException(error)
            }
        }
    }
    public async detail(merchant: string, id: String, request): Promise<any> {
        if (this.merchantService.isExist(merchant, request.id)) {

            try {
                return await this.packageModel.findOne({ merchant: merchant, _id: id })
            } catch (error) {
                throw await new UnauthorizedException(error)
            }
        }
    }
    public async update(request, input: UpdatePackageDto) {
        if (this.merchantService.isExist(input.merchant, request.id)) {

            try {
                await this.packageModel.findOneAndUpdate({ _id: input._id, merchant: input.merchant }, input)
                return input
            } catch (error) {
                throw await new UnauthorizedException(error)
            }
        }
    }
    public async remove(merchant: string, id: string,request) {
        if (this.merchantService.isExist(merchant, request.id)) {

            try {
                return await this.packageModel
                    .remove({ _id: id, merchant: merchant })
                    .then((res) => {
                        return res
                    })
            } catch (error) {
                throw await new UnauthorizedException(error)
            }
        }
    }
}
