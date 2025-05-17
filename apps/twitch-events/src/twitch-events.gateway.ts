import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import WebSocket from 'ws';
import axios from 'axios';

@Injectable()
export class TwitchEventsGateway implements OnModuleInit {
  
  private readonly logger = new Logger(TwitchEventsGateway.name);
  private ws!: WebSocket;
  private twitchToken: string = '';
  private readonly oauthUrl = process.env.TWITCH_OAUTH_URL || 'https://id.twitch.tv/oauth2/token';
  private readonly websocketUrl = process.env.TWITCH_WEBSOCKET_URL || 'wss://eventsub.wss.twitch.tv/ws';
  private readonly eventsSubscriptionUrl = process.env.TWITCH_EVENTS_SUBSCRIPTION_URL || 'https://api.twitch.tv/helix/eventsub/subscriptions';
  private readonly clientId = process.env.TWITCH_CLIENT_ID;
  private readonly clientSecret = process.env.TWITCH_CLIENT_SECRET;

  async onModuleInit() {
    this.logger.log('Starting Twitch Events Gateway...');
    await this.authenticateWithTwitch();
    this.connectToTwitchWebSocket();
  }

  private async authenticateWithTwitch() {
    const url = this.oauthUrl;
    const response = await axios.post(
      url,
      null,
      {
        params: {
          client_id: this.clientId,
          client_secret: this.clientSecret,
          grant_type: 'client_credentials',
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

    this.ws = ws;
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
