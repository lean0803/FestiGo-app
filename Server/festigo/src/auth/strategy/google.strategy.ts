import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'), // ID aplikasi Google
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'), // Secret aplikasi Google
      callbackURL: 'http://localhost:3000/auth/google/callback', // URL callback setelah login
      scope: ['profile', 'email'], // Data yang akan diminta dari Google
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, emails, displayName } = profile;

    const user = {
      id,
      email: emails[0].value,
      username: displayName,
      accessToken,
    };

    done(null, user);
  }
}
