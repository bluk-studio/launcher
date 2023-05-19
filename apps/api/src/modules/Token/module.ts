import { Module } from '@nestjs/common';
import { environment } from 'src/environments';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenSchema } from 'src/entities';
import { JwtService } from "@nestjs/jwt";

import * as Controllers from './controllers';
import * as Services from './services';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: "TOKEN",
        imports: [JwtModule.register({ secret: environment.authorization.jwtSecret })],
        inject: [JwtService],
        useFactory: (jwtService: JwtService) => {
          const schema = TokenSchema;

          schema.post('save', { document: true }, async (document, next) => {
            if (!document.jwt) {
              const jwtId = await jwtService.signAsync({ id: document.id });
              document.jwt = jwtId;

              await document.save();
            };

            next();
          });

          return schema;
        }
      }
    ]),
    JwtModule.register({ secret: environment.authorization.jwtSecret })
  ],
  controllers: [...Object.values(Controllers)],
  providers: [...Object.values(Services)],
  exports: [...Object.values(Services)],
})
export class TokenModule {};