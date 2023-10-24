import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { Md5 } from 'ts-md5';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async getUser(id: number): Promise<User> {
        return await this.userRepository.findOne({ where: {id: id}});
    }

    async getUserByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({ where: { email: email }});
    }

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async createUser(userDto: UserDto): Promise<User> {
        return await this.userRepository.save({
            username: userDto.username,
            email: userDto.email,
            firstname: userDto.firstname,
            lastname: userDto.lastname,
            password_hash: this.hash(userDto.password)
        });
    }

    async updateUser(id: number, userDto: UserDto): Promise<User> {
        await this.userRepository.update(id, {
            username: userDto.username,
            email: userDto.email,
            firstname: userDto.firstname,
            lastname: userDto.lastname,
            password_hash: this.hash(userDto.password)
        });
        return await this.userRepository.findOne({ where: {id: id}});
    }

    async deleteUser(id: number) {
        return await this.userRepository.delete(id);
    }
    
    hash(password: string): string {
        const md5: Md5 = new Md5();
        return md5.appendStr(password).end().toString();
    }

}
