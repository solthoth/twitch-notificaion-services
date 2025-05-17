import { Controller, Get } from '@nestjs/common';
import { TwitchListenerServiceService } from './twitch-listener-service.service';

@Controller()
export class TwitchListenerServiceController {
  constructor(private readonly twitchListenerServiceService: TwitchListenerServiceService) {}

  @Get()
  getHello(): string {
    return this.twitchListenerServiceService.getHello();
  }
}
