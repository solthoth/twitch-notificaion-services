import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import WebSocket from 'ws';
import axios from 'axios';

@Injectable()
export class TwitchEventsGateway implements OnModuleInit {
  
  constructor(private readonly configService: ConfigService) {}
  private readonly logger = new Logger(TwitchEventsGateway.name);
  private twitchToken: string = '';
  
  private oauthTokenUrl!: string;
  private websocketUrl!: string;
  private eventsSubscriptionUrl!: string;
  private clientId!: string;
  private clientSecret!: string;
  
  async onModuleInit() {
    this.oauthTokenUrl = this.configService.get<string>('TWITCH_OAUTH_TOKEN_URL') || 'https://id.twitch.tv/oauth2/token';
    this.websocketUrl = this.configService.get<string>('TWITCH_WEBSOCKET_URL') || 'wss://eventsub.wss.twitch.tv/ws';
    this.eventsSubscriptionUrl = this.configService.get<string>('TWITCH_EVENTS_SUBSCRIPTION_URL') || 'https://api.twitch.tv/helix/eventsub/subscriptions';
    this.clientId = this.configService.get<string>('TWITCH_CLIENT_ID')!;
    this.clientSecret = this.configService.get<string>('TWITCH_CLIENT_SECRET')!;

    this.logger.log('Starting Twitch Events Gateway...');
    await this.authenticateWithTwitch();
    this.connectToTwitchWebSocket();
  }

  private async authenticateWithTwitch() {
    const url = this.oauthTokenUrl;
    const params = new URLSearchParams();
    params.append('client_id', this.clientId);
    params.append('client_secret', this.clientSecret);
    params.append('grant_type', 'client_credentials');

    const response = await axios.post(
      url,
      params.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    this.twitchToken = response.data.access_token;
    this.logger.log('Twitch token acquired');
  }

  private connectToTwitchWebSocket() {
    const ws = new WebSocket(this.websocketUrl);

    ws.on('open', () => {
      this.logger.log('Connected to Twitch EventSub WebSocket');
    });

    ws.on('message', async (data) => {
      const message = JSON.parse(data.toString());
      this.logger.debug('Received message: ' + JSON.stringify(message, null, 2));

      if (message.metadata?.message_type === 'session_welcome') {
        const sessionId = message.payload.session.id;
        this.logger.log(`Session ID: ${sessionId}`);

        // Subscribe to an example event like channel.follow
        await this.subscribeToFollowEvent(sessionId);
      }
    });

    ws.on('error', (err) => {
      this.logger.error('WebSocket error', err);
    });

    ws.on('close', () => {
      this.logger.warn('WebSocket connection closed');
    });

  }

  private async subscribeToFollowEvent(sessionId: string) {
    const response = await axios.post(
      this.eventsSubscriptionUrl,
      {
        type: 'channel.follow',
        version: '2',
        condition: {
          broadcaster_user_id: process.env.TWITCH_BROADCASTER_USER_ID,
        },
        transport: {
          method: 'websocket',
          session_id: sessionId,
        },
      },
      {
        headers: {
          'Client-ID': this.clientId,
          Authorization: `Bearer ${this.twitchToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    this.logger.log('Subscribed to follow event');
  }
}
