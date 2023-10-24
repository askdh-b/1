import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { JwtModule } from '@nestjs/jwt';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { CardModule } from 'src/card/card.module';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Comment]),
        JwtModule.register({
            secret: "secretKey",
            signOptions: { expiresIn: '7d' },
        }),
        UserModule,
        CardModule
      ],
      providers: [CommentService],
      controllers: [CommentController],
      exports: [CommentService]
})
export class CommentModule {}
