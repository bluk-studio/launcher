export interface ISession {
    id: string,
    profileId: string,
    started: bigint,
    lastActionTime: bigint,

    // todo
    // device: Device
};