import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GamesService } from "../services";

@ApiTags("Games")
@Controller("/games")
export class GamesController {
    constructor(
        private readonly gamesService: GamesService,
    ) {}

    // Fetch all games
    @Get()
    public async fetchGames() {
        return this.gamesService.fetchAll();
    };
};

@ApiTags("Games")
@Controller("/game/:id")
export class SingleGameController {
    constructor(
        private readonly gamesService: GamesService,
    ) {}
    
    // Fetch this game (by gameId)
    @Get()
    public async fetchGame(
        @Param("id") gameId: string,
    ) {
        return this.gamesService.fetchById(gameId);
    };
};