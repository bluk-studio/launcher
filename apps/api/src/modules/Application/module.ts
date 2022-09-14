import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import * as Modules from '../';

@Module({
  imports: [
    // MikroOrmModule.forRoot({
    //   entities: ['./dist/entities'],
    //   entitiesTs: ['./src/entities'],
    //   dbName: 'database.sqlite3',
    //   type: 'sqlite',
    // }),
    
    ...Object.values(Modules)
  ],
})
export class ApplicationModule {};