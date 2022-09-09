import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Merchant } from 'src/merchant/model/merchant.model';
import { Customer } from 'src/customer/model/costumer.model';
import mongoose from 'mongoose';
import { Package } from 'src/package/model/package.model';

export type OrderDocument = Order & Document;

@Schema({timestamps: true})
export class Order  {
  @Prop({required:true,type:String})
   transaction_code:string;
  
  @Prop({required:true,type:Number})
  quantity:number;

  @Prop({required:true,type:Number})
  price:number;

  @Prop({required:true,type:Date})
  date_processed:Date;
  
  
  @Prop({required:true,type:Date})
  date_predicted:Date;
  

  @Prop({type:Date})
  date_payment:Date;
  
  
  @Prop({type:Date})
  date_completed:Date;
  


  @Prop({type:Number})
  nominal_payment:Number;
  
 
  @Prop({type:Number})
  nominal_total:Number;


  @Prop({type:Boolean,default:false})
  status_taken:Boolean;

  @Prop({type:Boolean,required:true,default:false})
  status_process:Boolean;

  @Prop({type:Boolean,required:true})
  status_payment:Boolean;

  @Prop( {type: mongoose.Schema.Types.ObjectId,ref:'Package'})
  package:Package;

  @Prop({type: mongoose.Schema.Types.ObjectId,ref:'Merchant'})
  merchant:Merchant;

  @Prop({type: mongoose.Schema.Types.ObjectId,ref:'Customer',required : true})
  customer:Customer;
}

export const OrderSchema = SchemaFactory.createForClass(Order);