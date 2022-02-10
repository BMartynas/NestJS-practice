import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type CatDocument = Cat & Document;

@Schema()
export class Cat {
    @Prop()
    name: string;

    @Prop()
    age: number;

    @Prop()
    breed: string;

    @Prop()
    dateOfBirth: Date;

    @Prop()
    ownerEmail: string;

    @Prop()
    picture: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);