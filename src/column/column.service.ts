import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Column } from './column.entity';
import { Repository } from 'typeorm';
import { ColumnDto } from './column.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ColumnService {

    constructor(
        @InjectRepository(Column)
        private readonly columnRepository: Repository<Column>,
        private userService: UserService
    ) {}

    async getColumn(id: number): Promise<Column> {
        return await this.columnRepository.findOne({ where: { id: id } });
    }

    async getAllColumns(userId: number): Promise<Column[]> {
        return await this.columnRepository.find({ where: { user: await this.userService.getUser(userId) } });
    }

    async createColumn(userId: number, columnDto: ColumnDto): Promise<Column> {
        return await this.columnRepository.save({
            title: columnDto.title,
            user: await this.userService.getUser(userId)
        });
    }

    async updateColumn(id: number, userId: number, columnDto: ColumnDto): Promise<Column> {
        await this.columnRepository.update(id, {
            title: columnDto.title,
            user: await this.userService.getUser(userId)
        });
        return await this.columnRepository.findOne( { where: { id: id } } );
    }

    async delColumn(id: number) {
        return await this.columnRepository.delete(id);
    }

}