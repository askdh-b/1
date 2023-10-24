import { Module } from '@nestjs/common';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Column } from './column.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Column]),
    JwtModule.register({
        secret: "secretKey",
        signOptions: { expiresIn: '7d' },
    }),
    UserModule
  ],
  providers: [ColumnService],
  controllers: [ColumnController],
  exports: [ColumnService]
})
export class ColumnModule {}
