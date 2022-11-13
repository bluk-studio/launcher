import { Module } from '@nestjs/common';
import { environment } from 'src/environments';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenSchema } from 'src/entities';

import * as Controllers from './controllers';
import * as Services from './services';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "TOKEN",
        schema: TokenSchema,
      }
    ]),
    JwtModule.register({ secret: environment.authorization.jwtSecret })
  ],
  controllers: [...Object.values(Controllers)],
  providers: [...Object.values(Services)],
  exports: [...Object.values(Services)],
})
export class TokenModule {};