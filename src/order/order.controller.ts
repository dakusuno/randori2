import { Controller, UseGuards, Post, Body, Request, Get, Patch, Param, Query, ParseBoolPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateOrderDto } from "./dto/create-order.dto";
import { ListReportDto } from "../report/dto/list-report.dto";
import { PaymentOrderDto } from './dto/payment-order.dto';
import { request } from 'http';
import { IsBoolean } from 'class-validator';
import { take } from 'rxjs';
import { OrderQuery } from './model/order-query.model';
@Controller('order')
export class OrderController {
    constructor(private readonly orderService:OrderService){}

    @UseGuards(AuthGuard('jwt'))
    @Post("/:merchant")
    public async create(@Request() request, @Body() input:CreateOrderDto,@Param() param){
        input.merchant = param.merchant
        return await this.orderService.create(input,request)
    }
    @UseGuards(AuthGuard('jwt'))
    @Patch("/complete/:merchant/:id")
    public async complete(@Request() request,@Param() param){
        return await this.orderService.complete(param.merchant,param.id,request)
    }  
    @UseGuards(AuthGuard('jwt'))
    @Patch("/payment/:merchant/:id")
    public async payment(@Request() request,@Param() param,@Body() paymentDto:PaymentOrderDto){
        return await this.orderService.payment(param.merchant,param.id,paymentDto,request)
    }      
    @UseGuards(AuthGuard('jwt'))
    @Get("/:merchant")
    public async list(@Request() request, @Param() param,@Query() query:OrderQuery){
        console.log(param)

        return await this.orderService.list(param.merchant,query.search,query.processed,query.taken,request)
    }
    @UseGuards(AuthGuard('jwt'))
    @Get("/latest/:merchant")
    public async latest(@Request() request,@Param() param,@Query('status', ParseBoolPipe) status:Boolean){
        return await this.orderService.latestCreateOrder(param.merchant,status,request.user)
    }
    @UseGuards(AuthGuard('jwt'))
    @Get("/report/:merchant")
    public async report(@Request() request,@Param() param,@Query('date') date:string){
        return await this.orderService.listCompletedByDate(param.merchant,date,request)
    }
    @UseGuards(AuthGuard('jwt'))
    @Get("/:merchant/:id")
    public async detail(@Request() request,@Param() param){
        return await this.orderService.detail(param.merchant,param.id,request)
    }
    @UseGuards(AuthGuard('jwt'))
    @Patch("/taken/:merchant/:id")
    public async setTaken(@Request() request,@Param() param){
        return await this.orderService.setTaken(param.merchant,param.id,request)
    }
}
