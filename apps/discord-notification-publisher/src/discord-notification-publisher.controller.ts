import { Controller, Get } from '@nestjs/common';
import { DiscordNotificationPublisherService } from './discord-notification-publisher.service';

@Controller()
export class DiscordNotificationPublisherController {
  constructor(private readonly discordNotificationPublisherService: DiscordNotificationPublisherService) {}

  @Get()
  getHello(): string {
    return this.discordNotificationPublisherService.getHello();
  }
}
