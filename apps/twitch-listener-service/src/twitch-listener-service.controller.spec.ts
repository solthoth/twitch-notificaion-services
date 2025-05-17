import { Test, TestingModule } from '@nestjs/testing';
import { TwitchListenerServiceController } from './twitch-listener-service.controller';
import { TwitchListenerServiceService } from './twitch-listener-service.service';

describe('TwitchListenerServiceController', () => {
  let twitchListenerServiceController: TwitchListenerServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TwitchListenerServiceController],
      providers: [TwitchListenerServiceService],
    }).compile();

    twitchListenerServiceController = app.get<TwitchListenerServiceController>(TwitchListenerServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(twitchListenerServiceController.getHello()).toBe('Hello World!');
    });
  });
});
