// import * as mongoose from 'mongoose';

// export const Report = new mongoose.Schema({

//   detail: {required:true,type:String},

//   price: {required:true,type:Number},

//   type_report : {required:true,type:Boolean},

//   merchant:{type: mongoose.Schema.Types.ObjectId,ref:'merchant'},

//   is_order : {required:true,type:Boolean},

//   order:{required:true,type:String},

//   date:{type: Date,required:true}

// });
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Merchant } from 'src/merchant/model/merchant.model';
import { Costumer } from 'src/customer/model/costumer.model';
import mongoose from 'mongoose';
import { Package } from 'src/package/model/package.model';

export type ReportDocument = Report & Document;

@Schema({timestamps: true})
export class Report  {
  @Prop({required:true,type:String})
  detail:string;
  
  @Prop({required:true,type:Number})
  price:number;

  @Prop({required:true,type:Boolean})
  type_report:Boolean;
  
  
  @Prop({required:true,type:Boolean})
  is_order:Boolean;
  

  @Prop({type:String})
  order:string;
  
  
  @Prop({type:Date,required:true})
  date:Date;

  @Prop({type: mongoose.Schema.Types.ObjectId,ref:'merchant'})
  merchant:Merchant;
}

export const ReportSchema = SchemaFactory.createForClass(Report);