import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Profile } from "src/entities";
import { ProfileService } from "../services";

@ApiTags("Profile")
@Controller("profile/:id")
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
  ) {}

  @Get()
  public async getById(
    @Param("id") id: string,
    @Query("fetchType") fetchType: "profileId" | "identityId" = "profileId",
  ): Promise<Profile> {
    console.log("fetchType:", fetchType)
    switch (fetchType) {
      case "profileId":
        console.log('profileId fetch type');
        return await this.profileService.getByProfileId(id);
      case "identityId":
        return await this.profileService.getByIdentityId(id);
    };
  };
};