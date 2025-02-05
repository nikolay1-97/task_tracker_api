import { Controller, Post, Body, Response, BadRequestException, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth_data.dto';
import {Response as Res} from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() authData: AuthDto, @Response() res: Res) {
    const token = await this.authService.login(authData.email, authData.password);
    if(!token) {
      res.header('authorization', 'none').json('none')
      return new BadRequestException('incorrect login or password')
    }
    res.clearCookie('token')
    res.cookie('token', token)
    res.send()
    return res
  }
}
