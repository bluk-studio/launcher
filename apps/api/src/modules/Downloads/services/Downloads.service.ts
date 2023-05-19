import { IDownloadManifest } from "$types/entities/DownloadManifest";
import { Injectable } from "@nestjs/common";
import { DownloadsStorage } from "../storage";

@Injectable()
export class DownloadsService {
    // Fetch by gameId
    public async fetchByGameId(gameId: string): Promise<Array<IDownloadManifest>> {
        return DownloadsStorage.filter((x) => x.gameId == gameId);
    };

    // Fetch by gameId and version
    public async fetchByIdAndVersion(gameId: string, version: string): Promise<IDownloadManifest> {
        return DownloadsStorage.find((x) => x.gameId == gameId && x.version == version);
    };
};