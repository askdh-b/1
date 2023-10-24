import { User } from "src/user/user.entity";
import { Entity, PrimaryGeneratedColumn, Column as DColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity()
export class Column {
    @PrimaryGeneratedColumn()
    id: number

    @DColumn()
    title: string

    @ManyToOne(type => User)
    @JoinColumn()
    user: User
}