import { Controller, Post, Body } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {};

    @Post('register')
    async register(@Body() createUserDto: createUserDto) {
        this.userService.register(createUserDto);
    }
}
