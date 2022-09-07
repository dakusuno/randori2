import { Injectable, BadRequestException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { User, UserDocument } from './model/users.model';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from "bcrypt";
import { Model } from 'mongoose';


@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,) {}

  async findOne(username: string): Promise<any | undefined> {
      return await this.userModel.findOne({username:username}).exec();   
  }

  async create(input:any):Promise<any>{
    
    try {
      input.password = await bcrypt.hash(input.password, 10)
      return await new this.userModel(input).save();      
    } catch (error) {
      throw await new BadRequestException(error)
    }
  }
}