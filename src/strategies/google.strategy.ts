import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    // https://developers.google.com/identity/toolkit/securetoken
    // ^ For decoding an access token.  It is different from and ID token

    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: `${process.env.API_BASE_URL}/google/redirect`,
            scope: ['email', 'profile'],
        });
    }

    async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const { id, name, emails, photos } = profile
        const user = {
            id,
            email: emails[0].value,
            name: `${name.givenName} ${name.familyName}`,
            profileURL: photos[0].value
        }
        done(null, user);
    }
}