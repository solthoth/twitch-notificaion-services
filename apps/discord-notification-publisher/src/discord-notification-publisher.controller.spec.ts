import { Test, TestingModule } from '@nestjs/testing';
import { DiscordNotificationPublisherController } from './discord-notification-publisher.controller';
import { DiscordNotificationPublisherService } from './discord-notification-publisher.service';

describe('DiscordNotificationPublisherController', () => {
  let discordNotificationPublisherController: DiscordNotificationPublisherController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DiscordNotificationPublisherController],
      providers: [DiscordNotificationPublisherService],
    }).compile();

    discordNotificationPublisherController = app.get<DiscordNotificationPublisherController>(DiscordNotificationPublisherController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(discordNotificationPublisherController.getHello()).toBe('Hello World!');
    });
  });
});
