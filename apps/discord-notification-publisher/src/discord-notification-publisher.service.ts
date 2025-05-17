import { Injectable } from '@nestjs/common';

@Injectable()
export class DiscordNotificationPublisherService {
  getHello(): string {
    return 'Hello World!';
  }
}
