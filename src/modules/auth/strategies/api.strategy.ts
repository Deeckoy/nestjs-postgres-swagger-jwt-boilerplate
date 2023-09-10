import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { DoneCallback } from 'passport';

@Injectable()
export class ApiStrategy extends PassportStrategy(HeaderAPIKeyStrategy, 'api') {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    const headerKeyApiKey = configService.get<string>('HEADER_API_NAME') || '';

    super(
      { header: headerKeyApiKey, prefix: '' },
      true,
      async (apiKey: string, done: DoneCallback) => {
        if (this.authService.validateApiKey(apiKey)) {
          done(null, true);
        }

        done(new UnauthorizedException(), null);
      },
    );
  }
}
