import { BadRequestException, Injectable, NotFoundException, Inject } from "@nestjs/common";
import { Identity } from '@ory/client';
import { Model } from "mongoose";
import { Profile, ProfileDocument } from "src/entities";
import { InjectModel } from '@nestjs/mongoose';
import { ORY_CLIENT } from "src/modules/OryClient/Client.symbol";
import { OryClient } from "src/modules/OryClient/Client.type";

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel("PROFILE")
    private readonly profileModel: Model<ProfileDocument>,

    @Inject(ORY_CLIENT)
    private readonly oryClient: OryClient,
  ) {}

  public async getByProfileId(profileId: string): Promise<Profile | null> {
    const profile = await this.profileModel.findById(profileId);
    if (!profile) return null;

    return this.transformProfile(profile, await this.getIdentityById(profile.identityId));
  };

  // 
  public async getByIdentityId(identityId: string): Promise<Profile | null> {
    const profile = await this.profileModel.findOne({ identityId });
    if (!profile) return null;
    
    // Transforming and returning
    return this.transformProfile(profile, await this.getIdentityById(identityId));
  };

  // 
  public async createFromIdentity(identity: Identity): Promise<Profile> {
    // Checking if this profile is not created
    if (await this.getByIdentityId(identity.id) != null) throw new BadRequestException(`Profile with identity id ${ identity.id } already created`);
  
    // Creating new profile
    const profile = new this.profileModel({
      identityId: identity.id,
    });

    // ...and returning it
    return this.transformProfile(await profile.save(), identity);
  };

  public async getIdentityById(id: string): Promise<Identity> {
    const response = await this.oryClient.adminGetIdentity(id);
    return response.data;
  };

  private transformProfile(profile: ProfileDocument, identity: Identity): Profile {
    return { 
      id: String(profile._id),
      identityId: profile.identityId,
      email: identity.traits["email"],
      avatar: identity.traits["avatar"],
      username: identity.traits["username"],
    };
  };
};