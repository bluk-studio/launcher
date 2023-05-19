import { IToken } from "$types/entities/Token";
import { ISession } from "$types/entities/Session";
import { Controller, Get, NotFoundException, Param, UnauthorizedException } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ProfileService } from "src/modules/Profile/services";
import { TokenService } from "src/modules/Token/services";
import { SessionResponse } from "./responses";

@Controller()
@ApiTags("Sessions")
export class SessionsController {
    constructor(
        private readonly tokenService: TokenService,
        private readonly profileService: ProfileService,
    ) {}

    @Get("/session/:sessionId")
    @ApiOkResponse({
        type: SessionResponse,
        description: "Возвращает информацию про запрашиваемую сессию",
    })
    @ApiNotFoundResponse({
        description: "Сессия не найдена"
    })
    public async getSessionById(
        @Param("sessionId") sessionId: string,
    ): Promise<SessionResponse> {
        // Trying to find token with this id
        const token = await this.tokenService.getById(sessionId);
        if (!token) throw new NotFoundException("Could not find session with this id");

        // Transforming and returning it as a session
        return await this.transformTokenToSession(token);
    };

    @Get("/sessions/:token")
    @ApiOkResponse({
        type: SessionResponse,
        isArray: true,
        description: "Возвращает список активных сессиий данного аккаунта"
    })
    @ApiNotFoundResponse({
        description: "Профиль не был найден"
    })
    @ApiUnauthorizedResponse({
        description: "Токен недействителен"
    })
    public async getSessions(
        @Param("token") tokenId: string,
    ): Promise<Array<SessionResponse>> {
        // Getting token information from TokenService
        const token = await this.tokenService.getByTokenId(tokenId);
        if (!token) throw new UnauthorizedException("Token not found");
        
        // Getting profile from this token
        const profile = await this.profileService.getByProfileId(token.profileId);
        if (!profile) throw new NotFoundException("Profile not found");

        // And now - getting all profile tokens and returning them
        // todo maybe add token permissions?
        const tokens = await this.tokenService.getProfileTokens(profile.id);

        // Transforming these tokens into sessions
        const sessions = [];

        for (const token of tokens) {
            sessions.push(await this.transformTokenToSession(token));
        };

        // And returning them
        return sessions;
    };

    @Get("/sessions/:token/revoke/:sessionId")
    @ApiOkResponse({
        type: SessionResponse,
        description: "Удаляет сессию по её ID и возвращает удалённую сессию",
    })
    @ApiUnauthorizedResponse({
        description: "Токен недействителен"
    })
    @ApiNotFoundResponse({
        description: "Сессия с данным ID не была найдена"
    })
    public async revokeSession(
        @Param("token") tokenId: string,
        @Param("sessionId") sessionId: string,
    ): Promise<SessionResponse> {
        // Getting available sessions
        const sessions = await this.getSessions(tokenId);

        // Finding session with this id
        const sessionToDelete = sessions.find((x) => x.id == sessionId);
        if (!sessionToDelete) throw new NotFoundException("Session with this sessionId not found");

        // Deleting this session and returning it back
        await this.tokenService.deleteById(sessionToDelete.id);
        
        return sessionToDelete;
    };

    private async transformTokenToSession(token: IToken): Promise<ISession> {
        return {
            id: token.id,
            profileId: token.profileId,
            started: token.issued,
            lastActionTime: token.lastUsed
        };
    };
};