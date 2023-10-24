import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './card.entity';
import { JwtModule } from '@nestjs/jwt';
import { ColumnModule } from 'src/column/column.module';
import { CardService } from './card.service';
import { CardController } from './card.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Card]),
        JwtModule.register({
            secret: "secretKey",
            signOptions: { expiresIn: '7d' },
        }),
        ColumnModule
      ],
      providers: [CardService],
      controllers: [CardController],
      exports: [CardService]
})
export class CardModule {}
