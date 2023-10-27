import { IsString, MaxLength, MinLength } from "class-validator";
import { User } from "src/user/user.entity";
import { Entity, PrimaryGeneratedColumn, Column as DColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity()
export class Column {
    @PrimaryGeneratedColumn()
    id: number

    @IsString()
    @MinLength(8)
    @MaxLength(40)
    @DColumn()
    title: string

    @ManyToOne(type => User)
    @JoinColumn()
    user: User
}