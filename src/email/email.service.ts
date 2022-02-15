import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EmailConstants } from 'src/constants/constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class EmailService {
    constructor(private jwtService: JwtService) {}
    
    readonly transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: EmailConstants.email,
            pass: EmailConstants.password
          },
    })

    async sendEmail(id: string, registeredUserEmail: string) {
        const emailToken = this.jwtService.sign(
            {
                userId: id,
            },
            {
                expiresIn: '1d'
            }
        );

        const url = `http://localhost:3000/confirmation/${emailToken}`;

        this.transporter.sendMail({
            from: EmailConstants.email,
            to: registeredUserEmail, 
            subject: "Email confirmation",
            html: `Please click this link to confirm your email: <a target="_blank" href="${url}">${url}</a>"`,
          });
    }   
}
