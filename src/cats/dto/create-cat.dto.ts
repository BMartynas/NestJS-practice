import { Type } from 'class-transformer';
import {  IsString, Min, IsDate, IsEmail, MinDate, IsOptional } from 'class-validator';    

export class CreateCatDto {
    @IsString()
    name: string;

    @Min(0)
    age: number;

    @IsString()
    breed: string;

    @Type(() => Date)
    @IsDate()
    @MinDate(new Date('2011-01-01'))
    dateOfBirth: Date;

    @IsEmail()
    ownerEmail: string;

    @IsOptional()
    @IsString()
    picture: string;
}   