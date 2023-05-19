import type { IDownloadManifest, IDownloadAsset } from '$types/entities/DownloadManifest';
import type { IGame } from '$types/entities/Game';
import { BaseDirectory, createDir, exists, readTextFile, writeBinaryFile, writeTextFile } from '@tauri-apps/api/fs';
import { GameDownloadsService, GameService } from 'src/services';
import { writable } from 'svelte/store';
import { getStore } from '../StoreHelpers';
import { getClient, ResponseType } from '@tauri-apps/api/http';
import { appLocalDataDir, normalize } from '@tauri-apps/api/path';
import { object_without_properties } from 'svelte/internal';

// Helpers
const client = await getClient();

// Store interface
export interface IOngoingDownload {
    gameId: string,
    downloadPath: string,
    downloadedAssets: Array<string>,
    manifest: IDownloadManifest,
};

enum DownloadState {
    IDLE,
    DOWNLOADING,
    STOPPING,
    CHECKING
};

export type IDownloadsManagerStore = Array<OngoingDownload>;

class OngoingDownload {
    constructor(
        private readonly data: IOngoingDownload
    ) {
        // Calculating download progress...
        this.assetsLength = data.manifest.assets.length;
        this.downloadedAssetsLength = data.downloadedAssets.length;
    };

    // Download information
    public readonly assetsLength: number;
    public downloadedAssetsLength: number;
    public currentlyDownloading: IDownloadAsset;

    public state: DownloadState = DownloadState.IDLE;

    // Start (or continue) this download
    public async start() {
        if (this.state == DownloadState.IDLE) {
            this.state = DownloadState.DOWNLOADING as DownloadState;

            // Starting download
            // for (const asset of this.data.manifest.assets) {
            //     // Checking if we have downloaded this asset or no
            //     if (this.data.downloadedAssets.includes(asset.path)) continue;

            //     // Downloading this asset
            //     const data = (
            //         await client.get(asset.url, {
            //             responseType: ResponseType.Binary,
            //         })
            //     ).data as any;
                
            //     const path = await normalize(await appLocalDataDir() + '/games/' + this.data.gameId + asset.path);
                
            //     // Checking if we have this folder created or no
            //     const folder = (path.split("\\").slice(0, path.split("\\").length - 1)).join("\\");

            //     if (!await exists(folder)) {
            //         // Creating this folder
            //         await createDir(folder, { recursive: true });
            //     };

            //     // Saving
            //     await writeBinaryFile(
            //         path, data, { dir: BaseDirectory.AppLocalData }
            //     );

            //     // Updating
            //     await this._updateProgress(asset.path);

            //     if (this.state == DownloadState.STOPPING) {
            //         // Stopping
            //         this.state = DownloadState.IDLE;
            //         return;
            //     };
            // };

            // Stopping this download
            // this.state = DownloadState.IDLE as DownloadState;
            // this.stop();
        };
    };

    // Stop this download
    public async stop() {
        // Checking our current state
        if (this.state == DownloadState.DOWNLOADING) {
            this.state = DownloadState.STOPPING as DownloadState;
            await (new Promise((resolve) => {
                let triedTimes = 0;

                function exit() {
                    clearInterval(interval);
                    resolve(null);
                };

                const interval = setInterval(() => {
                    // Checking current state
                    if (this.state == DownloadState.IDLE) {
                        exit();
                    } else {
                        triedTimes++;
                    };

                    if (triedTimes >= 30) {
                        exit();
                    };
                }, 150);
            }))
        };

        this.state = DownloadState.IDLE as DownloadState;

        // Checking if this download has ended or no
        if (this.downloadedAssetsLength == this.assetsLength) {
            // Deleting this download
            DownloadManagerStore.remove(this.getGameId());

            // Sending notification to user
            console.log('okay!');
        };
    };

    private async _updateProgress(downlaodedFile: string) {
        // Adding this downloaded file to downloadedAssets
        if (!this.data.downloadedAssets.includes(downlaodedFile))
            this.data.downloadedAssets.push(downlaodedFile);

        // Saving
        await DownloadManagerStore.saveToDisk();

        // Updating downloaded assets length
        this.downloadedAssetsLength++;
    };

    // Some popular getters
    public getGameId(): string {
        return this.data.gameId;
    };

    public async getGameInformation(): Promise<IGame> {
        // return new Promise(() => {});
        return await GameService.fetchById(this.data.gameId);
    };

    public getAssetsSize(): number {
        return this.assetsLength;
    };

    public getProgress(): number {
        // Calculating download progress
        return 10
        // return Math.round((this.downloadedAssetsLength / this.assetsLength) * 100);
    };

    // Get IOngoingDownload interface information
    public getSerialized(): IOngoingDownload {
        return this.data;
    };
};

// Store creation function
function _initialize() {
    const _default: IDownloadsManagerStore = [];

    const { subscribe, update } = writable<IDownloadsManagerStore>(_default);

    // Returning our store information
    return {
        subscribe,

        // | Initialize function
        // This function will get ongoing downloads from
        // json file and start them
        async fetchFromStorage() {
            // Getting contents of $AppLocalData/downloads.json
            if (await exists("downloads.json", { dir: BaseDirectory.AppLocalData })) {
                // Getting contents of this file
                const contents = await readTextFile("downloads.json", { dir: BaseDirectory.AppLocalData });

                // Parsing this file and updating our store
                try {
                    const json = JSON.parse(contents) as Array<IOngoingDownload>;
                    update(() => {
                        return json.map((x) => new OngoingDownload(x));
                    });
                } catch{};
            };
        },

        // | Start all downloads
        // Starts all OngoingDownloads, that are stored
        // in this store
        async startAll() {
            const store = await getStore({ subscribe });

            store.forEach((download) => download.start());
        },

        // | Add new download
        // Fetch and add a new download to this store (and save it's information to disk)
        async add(gameId: string, version: string, downloadPath: string,): Promise<OngoingDownload> {
            const store = await getStore({ subscribe });
            const manifest = await GameDownloadsService.fetchByVersion(gameId, version);
            if (!manifest) return;

            // Checking if we already have download information for this game
            if (store.find((x) => x.getGameId() == gameId)) return;

            // Adding this download to our store
            const ongoingDownload: OngoingDownload = new OngoingDownload({
                gameId: gameId,
                downloadPath,
                downloadedAssets: [],
                manifest,
            });

            // Adding to store
            update((object) => {
                object.push(ongoingDownload);
                return object;
            });

            // Saving our store download
            await DownloadManagerStore.saveToDisk();

            return ongoingDownload;
        },

        // | Remove download
        async remove(gameId: string) {
            // Removing download for this game from our store
            update((object) => {
                return object.filter((x) => x.getGameId() != gameId);
            });

            // Saving our store information
            await DownloadManagerStore.saveToDisk();
        },

        // | Save to disk
        // Save serialized information about all downloads to $AppLocalData/downloads.json
        async saveToDisk(): Promise<boolean> {
            // Serializing all downloads
            const store = await getStore({ subscribe });
            const serialized = store.map((x) => x.getSerialized());

            // Saving to file
            await writeTextFile("downloads.json", JSON.stringify(serialized), { dir: BaseDirectory.AppLocalData });

            return true;
        },
    };
};

// Exporting our store
export const DownloadManagerStore = _initialize();