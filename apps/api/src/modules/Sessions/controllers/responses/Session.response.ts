import { ISession } from "$types/entities/Session";
import { ApiProperty } from "@nestjs/swagger";

export class SessionResponse implements ISession {
    @ApiProperty({
        description: "ID данной сессии",
    })
    id: string;

    @ApiProperty({
        description: "ID профиля, к которому привязана данная сессия"
    })
    profileId: string;

    @ApiProperty({
        description: "Время начала данной сессии, в формате unix-timestamp"
    })
    started: bigint;

    @ApiProperty({
        description: "Время, в формате unix-timestamp, когда токен данной сессии был активен"
    })
    lastActionTime: bigint;
};