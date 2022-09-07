import { Module } from '@nestjs/common';
import { CostumerController } from './costumer.controller';
import { CostumerService } from './costumer.service';
import { MongooseModule } from '@nestjs/mongoose';
import {  Customer, CustomerSchema } from "./model/costumer.model";
import * as mongooseDeletor from "mongoose-delete";
import { MerchantModule } from 'src/merchant/merchant.module';

@Module({
  imports:[MongooseModule.forFeature([{name:Customer.name,schema:CustomerSchema}]),MerchantModule,],
  exports:[MongooseModule.forFeature([{name:Customer.name,schema:CustomerSchema}])],
  
  controllers: [CostumerController],
  providers: [CostumerService]
})
export class CostumerModule { }
