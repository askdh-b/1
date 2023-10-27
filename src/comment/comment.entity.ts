import { IsString, MaxLength, MinLength } from "class-validator";
import { Card } from "src/card/card.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number

    @IsString()
    @MinLength(1)
    @MaxLength(4000)
    @Column()
    content: string

    @ManyToOne(type => User)
    @JoinColumn()
    user: User

    @ManyToOne(type => Card)
    @JoinColumn()
    card: Card
}