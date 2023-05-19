import type { IDownloadManifest } from "$types/entities/DownloadManifest";
import { ConfigStore, getStore, type IConfigStore } from "src/stores";

class GameDownloadsServiceClass {
    // Fetch by game id
    async fetchByGameId(gameId: string): Promise<Array<IDownloadManifest>> {
        const config = await getStore(ConfigStore);

        try {
            // Trying to get all DownloadManifests from bluk launcher api
            const response = await fetch(`${config.launcherApiUrl}/game/${gameId}/downloads`);
            if (response.status != 200) return;

            return (await response.json()) as Array<IDownloadManifest>;
        } catch {
            return;
        };
    };

    // Fetch by game id and manifest version
    async fetchByVersion(gameId: string, version: string): Promise<IDownloadManifest> {
        const config = await getStore(ConfigStore);

        try {
            const response = await fetch(`${config.launcherApiUrl}/game/${gameId}/downloads/${version}`);
            if (response.status != 200) return;

            return (await response.json()) as IDownloadManifest;
        } catch {
            return;
        };
    };

    // Fetch latest
};

export const GameDownloadsService = new GameDownloadsServiceClass();