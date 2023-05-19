import { Controller, Get, Req, Res, Query, ForbiddenException } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthorizationService } from "../services";
import { Request, Response } from 'express';
import { environment } from "src/environments";
import parseUrl = require("parse-url");

@ApiTags("Authorization")
@Controller("auth")
export class AuthorizationController {
  constructor(
    private readonly authService: AuthorizationService,
  ) {}

  @Get("/redirect")
  public async redirectToLoginPage(
    @Res() res: Response,
    @Query("redirectUrl") redirectUrl?: string,
  ) {
    res.redirect(`https://auth.odzi.dog/flow?redirectUrl=${ encodeURI(`${ environment.siteUrl }${ environment.globalPrefix }/auth/token?redirectUrl=${ redirectUrl ?? "https://bluk.studio" }`) }&redirectVisualIdentifier=bluk launcher`);
  };

  @Get("/token")
  public async authorize(
    @Req() req: Request,
    @Res() res: Response,
    @Query("redirectUrl") redirectUrl?: string,
  ) {
    const token = await this.authService.handleGetToken(req, redirectUrl);

    if (redirectUrl) {
      // Checking redirect origin
      if (!environment.authorization.allowedOrigins.includes(parseUrl(redirectUrl).resource)) 
        throw new ForbiddenException("This redirectUrl is not allowed.");

      // Redirecting
      const url = parseUrl(redirectUrl);
      
      return res.redirect(`${url.href}${Object.keys(url.query).length == 0 ? `?token=${ token.jwt }` : `&token=${ token.jwt }`}`);
    } else {
      // Returning token information
      return res.send(token);
    };
  };
};