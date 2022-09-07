import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Report } from './model/report.model';
import { CreateReportDto } from "./dto/create-report.dto";
import { Model } from 'mongoose';

@Injectable()
export class ReportService {
    constructor (@InjectModel(Report.name) private readonly reportModel:Model<Report>){}

    public async create(reportDTO:CreateReportDto){
        try {
            return await new this.reportModel(reportDTO).save()
        } catch (error) {
            throw await error
        }
    }
    public async list(input:any,dateinput:Date):Promise<any>{
        try {
            var date = new Date(dateinput)
            return await this.reportModel.find({merchant:input,date:{
                '$gte':date.setHours(0,0,0,0),
                '$lte':date.setHours(23,59,59,999)
            }})
        } catch (error) {
            throw await new UnauthorizedException(error)
        }
    }
    public async detail(merchant:String,id:String):Promise<any>{
        try {
            return await this.reportModel.findOne({merchant:merchant,_id:id})
        } catch (error) {
            throw await new UnauthorizedException(error)
        }
    }
    public async cashFlowToday(merchant:String){
        var date = new Date()
        try {
            return await this.reportModel.find({merchant:merchant,date:{
                '$gte':date.setHours(0,0,0,0),
                '$lte':date.setHours(23,59,59,999)}}).then(res =>{
                    var total:number = 0
                    res.forEach(element => {
                       total += element.price
                    });
                    return {
                        total : total
                    }
                })
        } catch (error) {
            
        }
    }
    public async remove(merchant:string,id:string){
        try {
            return await this.reportModel.findOneAndDelete({_id:id,merchant:merchant})
        } catch (error) {
            throw await new UnauthorizedException(error)
        }
    }
}

