import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/enums/role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    username: string;

    @Prop()
    password: string;

    @Prop()
    email: string;

    @Prop({ default: ['user'] })
    roles: Role[];

    @Prop({ default: false })
    isActivated: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);