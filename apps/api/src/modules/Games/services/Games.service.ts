import { IGame } from "$types/entities/Game";
import { Injectable, NotFoundException } from "@nestjs/common";
import { GamesStorage } from "../storage";

@Injectable()
export class GamesService {
    // Fetch all games
    async fetchAll(): Promise<Array<IGame>> {
        return GamesStorage;
    };

    // Fetch game by id
    async fetchById(gameId: string): Promise<IGame> {
        const foundGame = GamesStorage.find((x) => x.id == gameId);

        // Todo
        // Remove this error throw
        if (!foundGame) throw new NotFoundException(`Game with id ${ gameId } not found`);
        return foundGame;
    };
};