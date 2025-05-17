import { NestFactory } from '@nestjs/core';
import { TwitchEventsModule } from './twitch-events.module';

async function bootstrap() {
  const app = await NestFactory.create(TwitchEventsModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
