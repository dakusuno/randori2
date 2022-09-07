

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import internal from 'stream';

export type UserDocument = User & Document;

@Schema({timestamps: true})
export class User extends Document {
  @Prop({unique:true,type:String, required: true})
  email: string;

  @Prop({unique:true,type:String, required: true},)
  phone_number: String;

  @Prop({unique:true,type:String, required: true})
  username: string;

  @Prop({type:String, required: true})
  password: string;

  @Prop({default:1,type:Number, required: true})
  privilege: Number;
}

export const UserSchema = SchemaFactory.createForClass(User);


