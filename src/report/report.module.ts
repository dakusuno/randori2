import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Report, ReportSchema } from "./model/report.model";
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

@Module({
   imports:[MongooseModule.forFeature([{name:Report.name,schema:ReportSchema}])],
   controllers:[ReportController],
   providers:[ReportService],
   exports:[ReportService]
    

})
export class ReportModule {}
