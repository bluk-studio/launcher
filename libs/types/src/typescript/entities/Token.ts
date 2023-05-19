export interface IToken {
  id: string,
  jwt: string,
  profileId: string,
  issued: bigint,
  lastUsed: bigint
}