import { Test, TestingModule } from '@nestjs/testing';
import { TwitchEventsController } from './twitch-events.controller';
import { TwitchEventsService } from './twitch-events.service';

describe('TwitchEventsController', () => {
  let twitchEventsController: TwitchEventsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TwitchEventsController],
      providers: [TwitchEventsService],
    }).compile();

    twitchEventsController = app.get<TwitchEventsController>(TwitchEventsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(twitchEventsController.getHello()).toBe('Hello World!');
    });
  });
});
