import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { mongoose, ReturnModelType } from '@typegoose/typegoose';
import { Order, OrderSchema } from "./model/order.model";
import { Package, PackageSchema } from 'src/package/model/package.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { PackageModel } from "../package/model/packagemodel.model";
import { Report } from "../report/model/report.model";
import { PaymentOrderDto } from './dto/payment-order.dto';
import { ToBoolean } from "../toBolean";
import { Merchant } from 'src/merchant/model/merchant.model';
import { Customer, CustomerDocument } from 'src/customer/model/costumer.model';
import { model, Model } from 'mongoose';
@Injectable()
export class OrderService {
    constructor(@InjectModel(Order.name) private readonly orderModel: Model<Order>,
        @InjectModel(Package.name) private readonly packageModel:Model<Package>,
        @InjectModel(Report.name) private readonly reportModel: Model<Report>,
        @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
        @InjectModel(Merchant.name) private readonly merchantModel: Model<Merchant>,
    ) { }

    public async create(input: CreateOrderDto, request): Promise<any> {
        if (this.checkMerchant(input.merchant, request.id)) {
            try {
                const pack: PackageModel = await this.packageModel.findOne({ _id: input.package })
                const dateTime = new Date()
                const currentDate = new Date()
                var lengthTrx: number = await this.orderModel.find({
                    merchant: input.merchant, date_processed: {
                        '$gte': dateTime.setHours(0, 0, 0, 0),
                        '$lte': dateTime.setHours(23, 59, 59, 999)
                    }
                }).then(res => {
                    return res.length
                })
                lengthTrx += 1
                var codeTrans = `TRX${dateTime.getFullYear()}\/${dateTime.getMonth()}\/${dateTime.getDate()}\/${lengthTrx.toString().padStart(5, "0")}`
                input.transaction_code = codeTrans
                if (input.status_payment) {
                    input.date_payment = currentDate
                } else {
                    input.date_payment = undefined
                }
                dateTime.setDate(dateTime.getDate() + pack.duration)
                input.date_predicted = dateTime
                input.date_processed = currentDate
                input.status_process = false
                input.price = input.quantity * pack.price
                return await new this.orderModel(input).save()
                .then(async (resultOrder) => {
                    const result =  await (await (await resultOrder.populate('package')).populate('merchant')).populate('customer')
                    
                    if(result.status_payment = true){
                         return new this.reportModel({
                                    detail: `Order kode transaksi ${result.id}`,
                                    is_order: true,
                                    price: result.price,
                                    date: currentDate,
                                    type_report: true,
                                    order: result.id,
                                    merchant: result.merchant,
                                }).save().then(report => {
                                    return {
                                        order: result,
                                        report: report
                                    }
                                 })
                    }
                    return {
                        order:result
                    }

                })
            } catch (error) {
                throw await new UnauthorizedException(error)
            }
        }
    }
    public async complete(merchant: string, id: String, request): Promise<any> {
        if (this.checkMerchant(merchant, request.id)) {
            try {
                const currentDate = new Date()
                return await this.orderModel
                    .findOneAndUpdate(
                        { _id: id, merchant: merchant },
                        { status_process: true, completed: currentDate },
                        { new: true }
                    )
                    .populate('customer')
                    .populate('package')
                    .populate('merchant')

            } catch (error) {
                throw await new UnauthorizedException(error)
            }
        }
    }
    public async payment(merchant: string, id: String, paymentDto: PaymentOrderDto, request): Promise<any> {
        if (this.checkMerchant(merchant, request.id)) {
            try {
                return await this.orderModel.findOneAndUpdate({ _id: id, merchant: merchant }, { status_payment: true, date_payment: new Date(), nominal_payment: paymentDto.nominal_payment }, { new: true }).then(order => {
                    return new this.reportModel({
                        detail: `Order kode transaksi ${order.id}`,
                        is_order: true,
                        price: order.price,
                        date: new Date(),
                        type_report: true,
                        order: order.id,
                        merchant: order.merchant
                    })
                        .save()
                        .then(report => {
                            return {
                                order: order,
                                report: report
                            }
                        })

                })
            } catch (error) {
                throw await new UnauthorizedException(error)
            }
        }
    }

    // List Order Yang Selesai Pada Hari Itu
    public async listCompletedByDate(merchant: string, reportDate: string, request) {
        if (this.checkMerchant(merchant, request.id)) {
            try {
                var date = new Date(reportDate)
                if (date == null) {
                    date = new Date()
                }
                return await this.orderModel.aggregate([
                    {
                        $lookup: {
                            from: "customers",
                            localField: "customer",
                            foreignField: "_id",
                            as: "customer"
                        }
                    },
                    {
                        $unwind: {
                            path: "$customer"
                        }
                    },
                    {
                        $lookup: {
                            from: "packages",
                            localField: "package",
                            foreignField: "_id",
                            as: "package"
                        }
                    },
                    {
                        $unwind: {
                            path: "$package"
                        }
                    },
                    {

                        $match:
                        {
                            $and: [
                                {
                                    merchant: merchant
                                },
                                {
                                    status_payment:true
                                },
                                {
                                    date_payment:{
                                        '$gte':date.setHours(0, 0, 0, 0),
                                        '$lte': date.setHours(23, 59, 59, 999)
                                    }
                                }
                            ]
                        }
                    }

                ])
            } catch (error) {
                throw await new UnauthorizedException(error)
            }
        }
    }
    public async list(merchants, search?: string, processed?:boolean, taken?:boolean, request?:any): Promise<any> {

     
        
        if (search == null) {
            search = ""
        }

        console.log("aaaaa")

        const idMerchant:string = merchants;

        var arrayParam: any = [
            {
                "merchant": new mongoose.Types.ObjectId(idMerchant)
            },


            {
                $or: [
                    { "transaction_code": { $regex: search, $options: "i" } },
                    { "customer.name": { $regex: search, $options: "i" } },
                ]
            }
        ]

        if (taken != null) {
            arrayParam.push(
                {
                    status_taken:taken
                }
            )
        }
        if (processed != null) {
            arrayParam.push(
                {
                    status_process: processed
                },
            )
        }

        if (this.checkMerchant(merchants, request.id)) {
            try {
                return await this.orderModel.aggregate([
                    {
                        $lookup: {
                            from: "customers",
                            localField: "customer",
                            foreignField: "_id",
                            as: "customer"
                        }
                    },
                    {
                        $unwind: {
                            path: "$customer"
                        }
                    },
                    {
                        $lookup: {
                            from: "packages",
                            localField: "package",
                            foreignField: "_id",
                            as: "package"
                        }
                    },
                    {
                        $unwind: {
                            path: "$package"
                        }
                    },
                    {

                        $match:
                        {
                            $and: arrayParam
                        }
                    },
                    {
                        $sort: { date_processed: 1 }
                    }

                ])
            } catch (error) {
                return error
            }
        }
    }








    public async detail(merchant: string, id: String, request: any): Promise<any> {
        if (this.checkMerchant(merchant, request.id)) {
            try {
                return await this.orderModel.aggregate([
                    {
                        $lookup: {
                            from: "costumers",
                            localField: "costumer",
                            foreignField: "_id",
                            as: "costumer"
                        }
                    },
                    {
                        $unwind: {
                            path: "$costumer"
                        }
                    },
                    {
                        $lookup: {
                            from: "packages",
                            localField: "package",
                            foreignField: "_id",
                            as: "package"
                        }
                    },
                    {
                        $unwind: {
                            path: "$package"
                        }
                    },
                    {

                        $match:
                        {
                            $and: [
                                {
                                    merchant: merchant
                                },
                                {
                                    _id:id
                                }
                            ]
                        }
                    }

                ]).then((res)=>{
                    return res[0]
                })
            } catch (error) {
                throw await new UnauthorizedException(error)
            }
        }
    }
    public async setTaken(merchant: string, id: String, request): Promise<any> {
        if (this.checkMerchant(merchant, request.id)) {
            try {
                return await this.orderModel
                    .findOneAndUpdate({ _id: id, merchant: merchant }, { status_taken: true }, { new: true })
            } catch (error) {
                throw await new UnauthorizedException(error)
            }
        }
    }
    public async latestCreateOrder(merchant: string, processeds: Boolean, request) {
        var arrayMatch: Array<any> 
        if (this.checkMerchant(merchant, request.id)) {
            try {
                return await this.orderModel
                    .aggregate([
                        {
                            $lookup: {
                                from: "costumers",
                                localField: "costumer",
                                foreignField: "_id",
                                as: "costumer"
                            }
                        },
                        {
                            $unwind: {
                                path: "$costumer"
                            }
                        },
                        {
                            $lookup: {
                                from: "packages",
                                localField: "package",
                                foreignField: "_id",
                                as: "package"
                            }
                        },
                        {
                            $unwind: {
                                path: "$package"
                            }
                        },
                        {

                            $match:
                            {
                                $and: [
                                    {
                                        merchant: new mongoose.Types.ObjectId(merchant)
                                    },
                                    {
                                      status_process:processeds 
                                    },
                                    {
                                        status_taken: false
                                    }
                                ]
                            }
                        },
                        {
                            $sort: { date_processed: 1 }
                        },
                        {
                            $limit: 1
                        }
                    ])
                    .then((res)=>{
                        return res[0]
                    })

            } catch (error) {
                throw await new UnauthorizedException(error)
            }

        }

    }
    public async checkMerchant(merchant: string, id: string): Promise<Boolean> {
        try {
            return await this.merchantModel.findOne({ _id:new mongoose.Types.ObjectId(merchant), user: new mongoose.Types.ObjectId(id) }).then((res) => {
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
