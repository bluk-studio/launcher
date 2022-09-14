import { LauncherConfig } from "$types/web_to_desktop/launcher/LauncherConfig";
import { ApiProperty } from '@nestjs/swagger';

export class LauncherConfigResponse implements LauncherConfig {
  @ApiProperty({
    description: "ID того или иного лаунчера",
    example: "bluk-launcher"
  })
  id: string;

  @ApiProperty({
    description: "Версия данного лаунчера",
    example: "1.0.0"
  })
  version: string;

  @ApiProperty({
    description: "Логотип, который используется в данной версии лаунчера"
  })
  logotype: string;
};