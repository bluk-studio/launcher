import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Token } from 'src/entities';
import { TokenService } from '../services';

@ApiTags("Tokens")
@Controller("token/:id")
export class TokenController {
  constructor(
    private readonly tokenService: TokenService,
  ) {}
  
  @Get()
  public async getById(
    @Param("id") id: string
  ): Promise<Token> {
    const token = await this.tokenService.getByTokenId(id);
    if (!token) throw new NotFoundException("Token with this tokenId not found");

    return token;
  };
};