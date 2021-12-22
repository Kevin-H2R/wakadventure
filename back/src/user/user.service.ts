import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Connection, Repository, UpdateResult} from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: string): Promise<User> {
        return this.usersRepository.findOne(id);
    }

    findOneByUid(uid: string): Promise<User> {
        return this.usersRepository.findOne({uid: uid})
    }

    async setUsername(uid: string, username: string): Promise<boolean> {
        const user : User = await this.usersRepository.findOne({uid: uid})
        if (!user) {
            return false
        }

        const userSameUsername : User = await this.usersRepository.findOne({username: username})
        if (userSameUsername) {
            return false
        }
        await this.usersRepository.update(user.id, {username: username})
        return true
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }

    async create(user: User): Promise<User> {
        return this.usersRepository.save(user)
    }
}
