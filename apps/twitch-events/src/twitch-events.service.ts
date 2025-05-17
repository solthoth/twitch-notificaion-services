import { Injectable } from '@nestjs/common';

@Injectable()
export class TwitchEventsService {
  getHello(): string {
    return 'Hello World!';
  }
}
