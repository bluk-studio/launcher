import { BadRequestException, ForbiddenException, Inject, Injectable } from "@nestjs/common";
import { ORY_CLIENT } from "src/modules/OryClient/Client.symbol";
import { OryClient } from "src/modules/OryClient/Client.type";
import { ProfileService } from "./Profile.service";
import { TokenService } from "src/modules/Token/services";
import { Request, Response } from 'express';
import { environment } from "src/environments";
import { Session } from "@ory/client";

@Injectable()
export class AuthorizationService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly profileService: ProfileService,

    @Inject(ORY_CLIENT)
    private readonly oryClient: OryClient,
  ) {}
  
  public async handleGetToken(req: Request, redirectUrl: string) {
    // Checking if we have any Ory session
    // available
    let session: Session;
    try {
      session = (await this.oryClient.toSession(undefined, req.header("cookie"))).data;
    } catch (error) {
      throw new ForbiddenException("User session not found.");
    };

    // Trying to get user with this identity id from database
    let profile = await this.profileService.getByIdentityId(session.identity.id);

    if (!profile) {
      // Creating new user profile for this auth identity
      profile = await this.profileService.createFromIdentity(session.identity);
    };

    // Generating and returning new token
    return await this.tokenService.createFromProfile(profile);
  };
};