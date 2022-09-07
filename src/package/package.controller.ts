import { Controller, Post, UseGuards, Request, Body, Get,Patch, Delete,Param } from '@nestjs/common';
import { PackageService } from './package.service';
import { AuthGuard } from '@nestjs/passport';
import { CreatePackageDto } from "./dto/create-package.dto";
import { request } from 'http';
import { UpdatePackageDto } from './dto/update-package.dto';
import { DeletePackageDto } from './dto/delete-package.dto';

@Controller('package')
export class PackageController {
    constructor (private readonly packageService:PackageService){}

    @UseGuards(AuthGuard('jwt'))
    @Post()
    public async create(@Body() input:CreatePackageDto,@Request() request,){
        return await this.packageService.create(input,request)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get("/:merchant")
    public async show(@Request() request,@Param() param){
        return await this.packageService.list(param.merchant,request)
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('/:merchant/:id')
    public async detail(@Request() request,@Param() param){
        return await this.packageService.detail(param.merchant,param.id,request)
    }
    @UseGuards(AuthGuard('jwt'))
    @Patch()
    public async update(@Request() request,@Body() input:UpdatePackageDto){
        return await this.packageService.update(request.user.id,input)
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/:merchant/:id')
    public async remove(@Request() request,@Param() param){
        return await this.packageService
        .remove(param.merchant,param.id,request)
    }

}
