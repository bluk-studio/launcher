import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Token } from "./Token.interface";

export type TokenDocument = Document & TokenModel;

@Schema()
export class TokenModel implements Omit<Token, "id"> {
  _id: string;

  @Prop({ required: false })
  jwt: string;
  
  @Prop({ required: true })
  profileId: string;
  
  @Prop({ type: Number })
  issued: bigint;

  @Prop({ type: Number })
  lastUsed: bigint;
};

export const TokenSchema = SchemaFactory.createForClass(TokenModel);