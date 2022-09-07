

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/users/model/users.model';
import internal from 'stream';

export type MerchantDocument = Merchant & Document;

@Schema({timestamps: true})
export class Merchant extends Document {
  @Prop({type:String, required: true})
  name: string;

  @Prop({type:String, required: true},)
  phone_number: String;

  @Prop({type:String, required: true})
  address: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'user'})
  user: User;
}

export const MerchantSchema = SchemaFactory.createForClass(Merchant);


