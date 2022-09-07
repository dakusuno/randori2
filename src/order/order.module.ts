import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from "./model/order.model";
import { OrderController } from './order.controller';
import { MerchantModule } from 'src/merchant/merchant.module';
import { PackageModule } from 'src/package/package.module';
import { Package, PackageSchema } from 'src/package/model/package.model';
import { Report, ReportSchema } from 'src/report/model/report.model';
import { ReportModule } from 'src/report/report.module';
import { Merchant, MerchantSchema } from 'src/merchant/model/merchant.model';
import { Customer, CustomerSchema } from 'src/customer/model/costumer.model';
@Module({
  imports:[
    MongooseModule.forFeature([{name:Order.name,schema:OrderSchema}]),
    MongooseModule.forFeature([{name:Report.name,schema:ReportSchema}]),
    MongooseModule.forFeature([{name:Package.name,schema:PackageSchema}]),
    MongooseModule.forFeature([{name:Customer.name,schema:CustomerSchema}]),
    MongooseModule.forFeature([{name:Merchant.name,schema:MerchantSchema}]),
    PackageModule,
    PackageModule,
    ReportModule,
    ],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
