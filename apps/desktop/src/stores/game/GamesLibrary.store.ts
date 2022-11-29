import { BaseDirectory, exists, readTextFile } from '@tauri-apps/api/fs';
import { writable } from 'svelte/store';
import { getStore } from '../StoreHelpers';
import { GameStore, type IGameStore, type ILoadedGame } from './Game.store';

interface ILibraryGame {
    id: string,
};

interface IGamesLibraryStore {
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
            GamesLibraryStore.checkInstalledGames();
        },

        // Check installed games
        async checkInstalledGames() {
            _setState("checkingInstalledGames");

            // Getting this store object
            const store = await getStore<IGamesLibraryStore>({ subscribe });

            for (const game of store.games) {

            };

            _setState("idle");
        },

        // Install new game
        async installGame(id: string) {
            _setState("installingGame");

            // todo
            // Fetching information about this game from API
            const game = await getStore<IGameStore>(GameStore) as ILoadedGame;
        
            // 

            _setState("installingGame");
        },
    };
}

export const GamesLibraryStore = _initialize();