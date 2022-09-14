import { Controller, Get, Param, Post } from "@nestjs/common";

@Controller("/session")
export class SessionController {
  @Post()
  public async createSession() {

  };

  @Get("/{sessionId}")
  public async getSession(
    @Param("sessionId") sessionId: string,
  ) {

  };
};