import { Module } from '@nestjs/common';
import { DiscordNotificationPublisherController } from './discord-notification-publisher.controller';
import { DiscordNotificationPublisherService } from './discord-notification-publisher.service';

@Module({
  imports: [],
  controllers: [DiscordNotificationPublisherController],
  providers: [DiscordNotificationPublisherService],
})
export class DiscordNotificationPublisherModule {}
