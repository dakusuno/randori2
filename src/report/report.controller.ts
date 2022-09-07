import { Controller, Post, UseGuards,Body,Get,Request,Param,Delete, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportService } from './report.service';
import { ListReportDto } from "./dto/list-report.dto";

@Controller('report')
export class ReportController {

    constructor (private readonly reportService:ReportService){}

    @UseGuards(AuthGuard('jwt'))
    @Get('/cashflowtoday/:merchant')
    public async cashflowToday(@Request() request,@Param() param){
        return await this.reportService.cashFlowToday(param.merchant)
    }
    @UseGuards(AuthGuard('jwt'))
    @Post()
    public async create (@Body() createReportDto:CreateReportDto){
        return await this.reportService.create(createReportDto)
    }
    @UseGuards(AuthGuard('jwt'))
    @Patch("/:merchant")
    public async show(@Request() request,@Param() param, @Body() listDto:ListReportDto){
        return await this.reportService.list(param.merchant,listDto.date)
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('/:merchant/:id')
    public async detail(@Request() request,@Param() param){
        return await this.reportService.detail(param.merchant,param.id)
    }
    @UseGuards(AuthGuard('jwt'))
    @Delete('/:merchant/:id')
    public async remove(@Request() request,@Param() param){
        return await this.reportService.remove(param.merchant,param.id)
    }
    
}
