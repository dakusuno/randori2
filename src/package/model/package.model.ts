// import * as mongoose from 'mongoose';

// export const Package = new mongoose.Schema({
//   name: { required: true, type: String },

//   unit: { required: true, type: Boolean },

//   detail: { required: true, type: String },

//   price: { required: true, type: Number },

//   duration: { required: true, type: Number },

//   merchant: { type: mongoose.Schema.Types.ObjectId, ref: 'merchant' },

//   order: { type: mongoose.Schema.Types.ObjectId, ref: 'order' }


// },
//   { timestamps: true }
// )



import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Merchant } from 'src/merchant/model/merchant.model';
import { Order } from 'src/order/model/order.model';

export type PackageDocument = Package & Document;

@Schema({timestamps: true})
export class Package extends Document {
  @Prop({type:String, required: true})
  name: string;

  @Prop({type:Boolean, required: true},)
  unit: Boolean;

  @Prop({type:String, required: true})
  detail: string;

  @Prop({type:Number, required: true})
  price: Number;

  @Prop({default:1,type:Number, required: true})
  privilege: Number;


  @Prop({ required: true, type: Number })
  duration: Number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'merchant' })
  merchant:Merchant;
 
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'order' })
  order:Order;
}

export const PackageSchema = SchemaFactory.createForClass(Package);


