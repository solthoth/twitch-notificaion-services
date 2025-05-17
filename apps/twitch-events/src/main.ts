import { NestFactory } from '@nestjs/core';
import { TwitchEventsModule } from './twitch-events.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(TwitchEventsModule);
  const logger = new Logger('Bootstrap');
  logger.log('Twitch Events service has started.');
}

bootstrap();
