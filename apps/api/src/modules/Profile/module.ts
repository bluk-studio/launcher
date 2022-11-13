import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileSchema, TokenSchema } from "src/entities";
import { OryClientModule } from "../OryClient/module";
import { JwtModule } from '@nestjs/jwt';
import { environment } from "src/environments";

import * as Controllers from './controllers';
import * as Services from './services';
import { TokenModule } from "../Token/module";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "PROFILE",
        schema: ProfileSchema,
      },
    ]),
    OryClientModule,
    TokenModule
  ],
  controllers: [...Object.values(Controllers)],
  providers: [...Object.values(Services)],
  exports: [...Object.values(Services)],
})
export class ProfileModule {};