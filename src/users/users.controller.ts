import { Controller, Post, Body, Inject, forwardRef } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { createUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        private userService: UsersService,
        private emailService: EmailService
        ) {};

    @Post('register')
    async register(@Body() createUserDto: createUserDto) {
        const user: any = await this.userService.register(createUserDto);
        this.emailService.sendEmail(user._id, user.email);
    }
}
