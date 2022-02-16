import { Type } from 'class-transformer';
import {  IsString, Min, IsDate, MinDate, IsOptional, MaxLength } from 'class-validator';    

export class CreateCatDto {
    @IsString()
    @MaxLength(256)
    name: string;

    @Min(0)
    age: number;

    @IsString()
    @MaxLength(256)
    breed: string;

    @Type(() => Date)
    @IsDate()
    @MinDate(new Date('2011-01-01'))
    dateOfBirth: Date;

    @IsOptional()
    @IsString()
    @MaxLength(256)
    picture: string;
}   