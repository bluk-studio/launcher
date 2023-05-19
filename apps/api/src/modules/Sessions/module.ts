import { Module } from "@nestjs/common";
import { TokenModule } from "../Token/module";
import { ProfileModule } from "../Profile/module";

import * as Services from './services';
import * as Controllers from './controllers';

@Module({
    imports: [
        TokenModule,
        ProfileModule
    ],
    providers: [...Object.values(Services)],
    controllers: [...Object.values(Controllers)],
    exports: [...Object.values(Services)],
})
export class SessionsModule {};