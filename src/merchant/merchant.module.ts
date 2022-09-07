import { Module } from '@nestjs/common';
import { MerchantController } from './merchant.controller';
import { MerchantService } from './merchant.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Merchant, MerchantSchema } from './model/merchant.model';
import * as mongooseDeletor from "mongoose-delete";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Merchant.name,
        useFactory:()=>{
          const schema = MerchantSchema;
          schema.plugin(require('mongoose-delete'))
          return schema
        }

      }
    ])
  ],
  controllers: [MerchantController],
  providers: [MerchantService],
  exports: [MerchantService]
})
export class MerchantModule { }
