import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { MongoRepository, ObjectID } from 'typeorm';
import { UserDTO } from 'src/DTOs/user.dto';
import { sign } from 'jsonwebtoken';

enum Provider
{
    GOOGLE = 'google'
}

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly users: MongoRepository<User>,
    ) {}

    async googleLogin(user: UserDTO): Promise<string> {
        if (!user) {
          throw new Error('Could not log in')
        }
    
        // Create the new user if they exist
        const u = await this.getUser(user.id);
        if (u) {
          this.updateUser(user.id, user);
        } else {
          this.createUser(user);
        }
    
        // Create JWT token
        const payload = {
          id: user.id,
          provider: Provider.GOOGLE
        }
        const token: string = sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 8 }); // Expires in 8 hours
        return token;
      }
    
    async getUsers(page: number, limit: number): Promise<User[]> {
        return await this.users.aggregate([
            { $match: {} },
            { $skip: page * limit },
            { $limit: limit }
        ]).toArray();
    }

    async getUser(id: string): Promise<User> {
        const users = await this.users.aggregate([
            { $match: { id }}
        ]).toArray();
        return users[0];
    }

    async createUser(user: UserDTO): Promise<void> {
        await this.users.save(user);
    }

    async updateUser(id: string, updates: Partial<UserDTO>): Promise<void> {
        const user = await this.getUser(id);
        this.users.update(user._id, updates);
    }

    async deleteUser(id: string): Promise<void> {
        await this.users.delete(id);
    }
}
