import type { IDownloadAsset, IDownloadManifest } from '$types/entities/DownloadManifest';
import { BaseDirectory, exists, readTextFile, writeTextFile } from '@tauri-apps/api/fs';
import { appLocalDataDir, normalize } from '@tauri-apps/api/path';
import { lib } from 'crypto-js';
import { GameDownloadsService, GameService } from 'src/services';
import { writable } from 'svelte/store';
import { DownloadManagerStore } from '../downloads';
import { getStore } from '../StoreHelpers';
import { GameStore, type IGameStore, type ILoadedGame } from './Game.store';

export interface ILibraryGame {
    id: string,
    download: {
        path: string,
        manifest: IDownloadManifest, 
    },
    isDownloaded: boolean,
};

export interface IGamesLibraryStore {
    games: Array<ILibraryGame>
    state: StoreState,
};

type StoreState = "checkingInstalledGames" | "idle" | "installingGame";

function _initialize() {
    const _default: IGamesLibraryStore = {
        games: [],
        state: "idle"
    };

    const { subscribe, update } = writable(_default);

    // Helper functions
    function _setState(state: StoreState) {
        update((object) => {
            object.state = state;
            return object;
        });
    };

    // Returning our store structure
    return {
        subscribe,

        // Initialize
        async fetchFromStorage() {
            // Fetching all installed games from storage (and check them)
            if (await exists("games.json", { dir: BaseDirectory.AppLocalData })) {
                const contents = await readTextFile("games.json", { dir: BaseDirectory.AppLocalData });
                
                try {
                    // Updating our store
                    const json = JSON.parse(contents) as Array<ILibraryGame>;
                    update(() => {
                        return {
                            games: json,
                            state: "idle",
                        };
                    });
                } catch {};
            };

            // Checking this games
            await GamesLibraryStore.checkInstalledGames();
        },

        // Check installed games
        async checkInstalledGames() {
            _setState("checkingInstalledGames");

            // Getting this store object
            const store = await getStore<IGamesLibraryStore>({ subscribe });

            for (const game of store.games) {
                console.log('check game:', game);
            };

            _setState("idle");
        },

        // Install new game
        async add(id: string, downloadPath?: string): Promise<ILibraryGame> {
            _setState("installingGame");

            // Getting game from bluk api
            const store = await getStore({ subscribe });
            const game = await GameService.fetchById(id);
            const { version } = (await GameDownloadsService.fetchByGameId(id))[0]; 

            // Checking if we already game this game in our store
            if (store.games.find((x) => x.id == id)) return;

            // Default download path
            if (!downloadPath) downloadPath = await normalize(await appLocalDataDir() + '/games/' + id);

            const libraryGame: ILibraryGame = {
                id: game.id, 
                download: {
                    path: downloadPath,
                    manifest: await GameDownloadsService.fetchByVersion(id, version),
                },
                isDownloaded: false,
            };

            // Adding this game to games library
            update((object) => {
                object.games.push(libraryGame);
                return object
            });

            // Saving our store
            await GamesLibraryStore.saveToDisk();

            // todo
            // Getting latest DownloadManifest version

            // Adding this game to downloads, and then starting download process
            const download = await DownloadManagerStore.add(id, version, downloadPath);
            download.start();

            _setState("idle");

            return libraryGame;
        },

        // Save to disk
        async saveToDisk() {
            // Serializing our storage
            const store = await getStore({ subscribe });
            const serialized = store.games;

            // Saving to $AppLocalData/games.json
            await writeTextFile("games.json", JSON.stringify(serialized), { dir: BaseDirectory.AppLocalData });
        },
    };
}

export const GamesLibraryStore = _initialize();