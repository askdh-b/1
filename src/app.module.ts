import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ColumnModule } from './column/column.module';
import { CardModule } from './card/card.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'father',
      password: 'passwd123S',
      database: 'trelloDb',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    ColumnModule,
    CardModule,
    CommentModule,
  ],
})
export class AppModule {}
