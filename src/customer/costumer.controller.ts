import { Controller, UseGuards, Post, Body, Request, Get, Req, Patch, Delete, Param } from '@nestjs/common';
import { CostumerService } from './costumer.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateCustomerDto } from "./dto/create-costumer.dto";
import { UpdateCostumerDto } from './dto/update-costumer.dto';

@Controller('costumer')
export class CostumerController {
    constructor (private readonly costumerService:CostumerService){}

    @UseGuards(AuthGuard('jwt'))
    @Post("/:merchant")
    public async create(@Body() input:CreateCustomerDto,@Param() param,@Request() request){
        input.merchant=param.merchant
        return await this.costumerService.create(input,request)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get("/:merchant")
    public async find(@Request() request,@Param() param){
        return await this.costumerService.find(param.merchant,request)
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch("/:merchant/:id")
    public async update(@Request() request,@Body() updatecost :UpdateCostumerDto,@Param() param){
        return await this.costumerService.update(updatecost,param.id,param.merchant,request)
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete("/:merchant/:id")
    public async remove(@Request() request,@Param() param){
        return await this.costumerService.delete(param.merchant,param.id,request)
    }
}
