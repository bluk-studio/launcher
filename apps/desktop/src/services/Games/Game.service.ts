import type { IGame } from "$types/entities/Game";
import { ConfigStore, getStore } from "src/stores";

class GameServiceClass {
    // Fetch game by id
    async fetchById(id: string): Promise<IGame> {
        const config = await getStore(ConfigStore);

        try {
            // Trying to get this game from bluk launcher api
            const response = await fetch(`${config.launcherApiUrl}/game/${id}`);
            if (response.status != 200) return;

            return (await response.json()) as IGame;
        } catch {
            return;
        };
    };
};

export const GameService = new GameServiceClass();