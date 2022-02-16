import { Type } from 'class-transformer';
import {  IsString, MinLength, MaxLength, Matches, IsEmail, IsArray, IsEnum } from 'class-validator';   
import { Role } from 'src/enums/role.enum';

export class createUserDto {
    @IsString()
    @MaxLength(256)
    username: string;

    @IsString()
    @MinLength(5, {message: 'Password is too short (5 characters min)!'})
    @MaxLength(12, {message: 'Password is too long (5 characters max)!'})
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 
        {message: 'Password must include at least one digit and uppercase and lowercase letter!'})
    password: string;

    @IsEmail()
    @MaxLength(256)
    email: string;

    @IsEnum(Role, { each: true })
    roles: Role[];
}