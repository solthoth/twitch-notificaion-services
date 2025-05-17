import { Module } from '@nestjs/common';
import { TwitchEventsController } from './twitch-events.controller';
import { TwitchEventsService } from './twitch-events.service';

@Module({
  imports: [],
  controllers: [TwitchEventsController],
  providers: [TwitchEventsService],
})
export class TwitchEventsModule {}
