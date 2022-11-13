export interface Token {
  id: string,
  profileId: string,
  issued: bigint,
  lastUsed: bigint
}