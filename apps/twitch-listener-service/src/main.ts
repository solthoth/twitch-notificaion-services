import { NestFactory } from '@nestjs/core';
import { TwitchListenerServiceModule } from './twitch-listener-service.module';

async function bootstrap() {
  const app = await NestFactory.create(TwitchListenerServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
