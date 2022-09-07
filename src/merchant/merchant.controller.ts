import { Controller, UseGuards, Get, Post, Request, Body, Patch, Req, Delete, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { MerchantService } from './merchant.service';
import { request } from 'express';

@UseGuards(AuthGuard('jwt'))
@Controller('merchant')
export class MerchantController {

    constructor(private readonly merchantService:MerchantService){}

    @Post()
    public async CreateMerchant(@Request() request,@Body() createMerchantDto:CreateMerchantDto){
        createMerchantDto.user=request.user.id
        return await this.merchantService.Create(createMerchantDto)
    }
    
    @Get()
    public async AllMerchant(@Request() request){
        return await this.merchantService.All(request.user.id)
    }
    @Patch()
    public async UpdateMerchant(@Request() request, @Body() updateMerchantDto:CreateMerchantDto){
        updateMerchantDto.user=request.user.id
        return await this.merchantService.Update(updateMerchantDto  )
    }
    @Delete('/:id')
    public async RemoveMerchant(@Request() request,@Param() param){        
        return await this.merchantService.Remove(request.user.id,param.id)
    }
    @Get("/:id")
    public async DetailMerchant(@Request() request,@Param() param){        
        return await this.merchantService.Detail(request.user.id,param.id)
    }
}
