import { Module } from '@nestjs/common';
import { TwitchListenerServiceController } from './twitch-listener-service.controller';
import { TwitchListenerServiceService } from './twitch-listener-service.service';

@Module({
  imports: [],
  controllers: [TwitchListenerServiceController],
  providers: [TwitchListenerServiceService],
})
export class TwitchListenerServiceModule {}
