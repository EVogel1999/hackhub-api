import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { MongoRepository, ObjectID } from 'typeorm';
import { UserDTO } from 'src/DTOs/user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly users: MongoRepository<User>,
    ) {}
    
    async getUsers(page: number, limit: number): Promise<User[]> {
        return await this.users.aggregate([
            { $match: {} },
            { $skip: page * limit },
            { $limit: limit }
        ]).toArray();
    }

    async getUser(id: string): Promise<User> {
        return await this.users.findOne(id);
    }

    async createUser(user: UserDTO): Promise<void> {
        await this.users.save(user);
    }

    async updateUser(id: string, updates: Partial<UserDTO>) {
        await this.users.update(id, updates);
    }

    async deleteUser(id: string) {
        await this.users.delete(id);
    }
}
