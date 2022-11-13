import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Profile } from './Profile.interface';

export type ProfileDocument = Document & ProfileModel;

@Schema()
export class ProfileModel implements Omit<Profile, "id" | "email" | "avatar" | "username"> {
  _id: Types.ObjectId;
  
  @Prop()
  identityId: string;
};

export const ProfileSchema = SchemaFactory.createForClass(ProfileModel);