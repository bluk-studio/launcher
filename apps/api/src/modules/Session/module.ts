import { Module } from '@nestjs/common';

import * as Controllers from './controllers';
import * as Services from './services';

@Module({
  controllers: [...Object.values(Controllers)],
  providers: [...Object.values(Services)],
  exports: [...Object.values(Services)],
})
export class SessionModule {};