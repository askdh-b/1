import { Card } from "src/card/card.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @ManyToOne(type => User)
    @JoinColumn()
    user: User

    @ManyToOne(type => Card)
    @JoinColumn()
    card: Card
}