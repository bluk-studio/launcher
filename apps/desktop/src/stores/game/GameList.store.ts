import { writable } from 'svelte/store';
import type { IGame } from '$types/entities/Game';
import { getStore } from '../StoreHelpers';
import { ConfigStore, type IConfigStore } from '../config';

export type IGameListStore = Array<IGame>;

function _initialize() {
    const _default: IGameListStore = []
    
    const { subscribe, update } = writable<IGameListStore>(_default);

    return {
        subscribe,

        // Methods
        async loadGames(): Promise<boolean> {
            // Fetching config store
            const config = await getStore<IConfigStore>(ConfigStore);

            // Fetching all games from bluk launcher api
            const response = await fetch(`${ config.launcherApiUrl }/games`);
            if (response.status != 200) return false;

            const json = await response.json() as Array<IGame>;
            // Updating our store
            update(() => (json));

            return true;
        },
    };
}

export const GameListStore = _initialize();