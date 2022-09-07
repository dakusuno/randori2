import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username)
        if(!user){
            throw await new UnauthorizedException('Incorrect Username nor Pasword')
        }else{
            const match = await bcrypt.compare(pass, user.password);
            if(user&&match){
                return await user
            }else{
                throw await new UnauthorizedException(`Incorrect Username nor Pasword`)
            }
        }
  }
  async register(input):Promise<any>{
    return this.usersService.create(input)
  }
  async login(user: any) {
    const payload = { username: user.username, id: user.id,privilege:user.privilege,phone_number:user.phone_number,email:user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}