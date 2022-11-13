import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from 'src/environments';

import * as Modules from '../';

@Module({
  imports: [
    // Mongoose
    MongooseModule.forRoot(environment.mongoUrl),
    
    ...Object.values(Modules)
  ],
})
export class ApplicationModule {};