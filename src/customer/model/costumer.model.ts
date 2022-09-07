

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomerDocument = Customer & Document;

@Schema({timestamps: true})
export class Customer extends Document {
  @Prop({required:true,type:String})
  name: string;

  @Prop({required:true,type:String})
  phone_number: String;

  @Prop({required:true,type:String})
  merchant: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

