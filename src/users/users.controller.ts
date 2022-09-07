import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { AddUserDto } from './dto/adduser.dto';

@Controller('users')
export class UsersController {
    constructor (private readonly userService:UsersService){}

    @Post()
    public async register(@Body() addUser:AddUserDto){
        return await this.userService.create(addUser)
    }
}
