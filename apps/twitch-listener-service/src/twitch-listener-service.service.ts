import { Injectable } from '@nestjs/common';

@Injectable()
export class TwitchListenerServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
