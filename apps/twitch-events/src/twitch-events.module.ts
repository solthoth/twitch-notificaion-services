import { Module } from '@nestjs/common';
import { TwitchEventsGateway } from './twitch-events.gateway';

@Module({
  providers: [TwitchEventsGateway],
})
export class TwitchEventsModule {}
