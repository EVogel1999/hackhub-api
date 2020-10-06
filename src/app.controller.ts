import { Controller, Get, HttpCode, Req } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('config')
  @HttpCode(200)
  getConfig() {
    return { clientID: process.env.GOOGLE_CLIENT_ID };
  }
}
