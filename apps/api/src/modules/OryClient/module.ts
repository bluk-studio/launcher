import { Module } from "@nestjs/common";

import { ClientProvider } from "./Provider.const";

@Module({
  providers: [ClientProvider],
  exports: [ClientProvider]
})
export class OryClientModule {};