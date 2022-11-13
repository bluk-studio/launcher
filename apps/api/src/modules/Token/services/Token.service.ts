import { Injectable } from "@nestjs/common";
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
    // Verifying provided token
    const tokenId = await this.jwtService.verifyAsync(id);
    
    return await this.getById(tokenId); 
  };

  // 
  public async getById(id: string): Promise<Token | null> {
    // Trying to fetch token with this id
    const token = await this.tokenModel.findById(id);
    if (!token) return null;

    return await this.transformToken(token);
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
    const jwtId = await this.jwtService.signAsync(token.id);

    return { 
      id: jwtId,
      profileId: token.profileId,
      issued: token.issued,
      lastUsed: token.lastUsed,
    };
  };
};