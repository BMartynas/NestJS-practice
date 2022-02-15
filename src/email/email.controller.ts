import { Controller, Get, Param, Redirect } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Controller()
export class EmailController {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
        ) {}
    
    @Get('confirmation/:token')
    @Redirect('http://localhost:3000/auth/login')
    async confirmEmail(@Param('token') token: string) {
        try {
          const { userId } = this.jwtService.verify(token);
          await this.usersService.activateUser(userId);  
        } catch (error) {
            console.log(error);
        }
    }
}
