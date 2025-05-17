import { NestFactory } from '@nestjs/core';
import { DiscordNotificationPublisherModule } from './discord-notification-publisher.module';

async function bootstrap() {
  const app = await NestFactory.create(DiscordNotificationPublisherModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
