import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Profile, Token, TokenDocument } from "src/entities";

@Injectable()
export class TokenService {
  constructor(
    @InjectModel("TOKEN")
    private readonly tokenModel: Model<TokenDocument>,
  
    private readonly jwtService: JwtService,
  ) {}

  public async getByTokenId(id: string): Promise<Token | null> {
    try {
      const token = await this.jwtService.verifyAsync(id) as { id: string };
      return await this.getById(token.id);
    } catch {
      return null;
    };
  };

  // 
  public async getById(id: string): Promise<Token | null> {
    // Trying to fetch token with this id
    const token = await this.tokenModel.findById(id);
    if (!token) return null;

    return await this.transformToken(token);
  };

  public async getProfileTokens(profileId: string): Promise<Array<Token>> {
    const tokens = await this.tokenModel.find({ profileId });
    const transformedTokens = [];

    for (const token of tokens) {
      transformedTokens.push(await this.transformToken(token));
    };

    return transformedTokens;
  };

  public async deleteById(id: string): Promise<Token> {
    // Getting token with this id
    const token = await this.getById(id);
    if (!token) throw new NotFoundException("Token not found");

    console.log("delete by id:", token);

    // Deleting this token
    console.log(await this.tokenModel.deleteOne({ id: token.id }));

    // Returning it back
    return token;
  };

  // 
  public async createFromProfile(profile: Profile): Promise<Token> {
    // Creating new auth token for this identity
    const token = new this.tokenModel({
      profileId: profile.id,
      issued: Math.floor(new Date().getTime() / 1000),
      lastUsed: Math.floor(new Date().getTime() / 1000),
    });

    return await this.transformToken(await token.save());
  };

  private async transformToken(token: TokenDocument): Promise<Token> {
    // Generating new JWT token for this token's id
    return { 
      id: token.id,
      jwt: token.jwt,
      profileId: token.profileId,
      issued: token.issued,
      lastUsed: token.lastUsed,
    };
  };
};