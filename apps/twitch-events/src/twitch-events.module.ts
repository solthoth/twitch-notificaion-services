import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TwitchEventsGateway } from './twitch-events.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  providers: [TwitchEventsGateway],
})
export class TwitchEventsModule {}
