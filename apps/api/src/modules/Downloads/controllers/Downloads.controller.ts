import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GamesService } from "src/modules/Games/services";
import { DownloadsService } from "../services";
import { DownloadManifestResponse } from "./responses";

@ApiTags("Games")
@Controller("/game/:gameId/downloads")
export class LauncherDownloadsController {
    constructor(
        private readonly gamesService: GamesService,
        private readonly downloadsService: DownloadsService,
    ) {}
    
    @Get()
    public async fetchAll(
        @Param("gameId") gameId: string,
    ): Promise<Array<DownloadManifestResponse>> {
        // Checking if this game exists
        // if (!this.gamesService.fetchById(gameId)) throw new NotFoundException("Game with this id not found");

        return this.downloadsService.fetchByGameId(gameId);
    };

    @Get("/:version")
    public async fetchByVersion(
        @Param("gameId") gameId: string,
        @Param("version") version: string,
    ): Promise<DownloadManifestResponse> {
        const manifest = this.downloadsService.fetchByIdAndVersion(gameId, version);
        if (!manifest) throw new NotFoundException("Download manifest with this gameId and version not found");

        return manifest;
    };
};