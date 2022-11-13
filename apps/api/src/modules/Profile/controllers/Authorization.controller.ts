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

  @Get("/token")
  public async authorize(
    @Req() req: Request,
    @Res() res: Response,
    @Query("redirectUrl") redirectUrl?: string,
  ) {
    let token;
    try {
      token = await this.authService.handleGetToken(req, redirectUrl);
    } catch (error) {
      if (redirectUrl) {
        // Saving redirectUrl to auth.odzi.dog's cookies
        const expires = new Date();
        expires.setHours(expires.getHours() + 1);

        res.cookie("redirectUrl", `${ environment.siteUrl }${ environment.globalPrefix }/auth/token?redirectUrl=${ redirectUrl }`, {
          domain: "odzi.dog",
          expires,
        });

        // Redirecting user to login page
        res.redirect("https://auth.odzi.dog/login");
      } else {
        throw error;
      };
    };

    if (redirectUrl) {
      // Checking redirect origin
      if (!environment.authorization.allowedOrigins.includes(parseUrl(redirectUrl).resource)) 
        throw new ForbiddenException("This redirectUrl is not allowed.");

      // Redirecting
      const url = parseUrl(redirectUrl);
      
      return res.redirect(`${url.href}${Object.keys(url.query).length == 0 ? `?token=${ token.id }` : `&token=${ token.id }`}`);
    } else {
      // Returning token information
      return res.send(token);
    };
  };
};