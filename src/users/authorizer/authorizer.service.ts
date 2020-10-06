import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthorizerService {
    validateIsUser(userId, requester) {
        if (requester.id !== userId) {
            throw new Error('User id does not match requester id');
        }
    }
}
