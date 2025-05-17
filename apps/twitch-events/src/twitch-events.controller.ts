import { Controller, Get } from '@nestjs/common';
import { TwitchEventsService } from './twitch-events.service';

@Controller()
export class TwitchEventsController {
  constructor(private readonly twitchEventsService: TwitchEventsService) {}

  @Get()
  getHello(): string {
    return this.twitchEventsService.getHello();
  }
}
