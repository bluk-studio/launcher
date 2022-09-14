import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { LauncherService } from '../services';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { LauncherConfigResponse } from './responses';

// Single launcher controller
@ApiTags("Launcher")
@Controller("launcher/:id")
export class LauncherController {
  constructor(
    private readonly launcherService: LauncherService
  ) {}

  @Get(":version")
  @ApiResponse({
    status: 200,
    type: () => LauncherConfigResponse
  })
  public async getLauncherById(
    @Param("id") id: string,
    @Param("version") version: string,
  ): Promise<LauncherConfigResponse> {
    const config = this.launcherService.fetchById(id).find((config) => config.version == version);
    if (config == null) throw new NotFoundException("LauncherConfig not found");

    return config;
  };
};

// Launchers controller
@ApiTags("Launcher")
@Controller("/launchers")
export class LaunchersController {
  constructor(
    private readonly launcherService: LauncherService
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: () => LauncherConfigResponse,
    isArray: true,
  })
  public async getLaunchers(): Promise<Array<LauncherConfigResponse>> {
    return this.launcherService.fetchAll();
  };
};