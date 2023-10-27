import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { Column } from "src/column/column.entity";
import { CreateDateColumn, Column as DColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Card {
    @PrimaryGeneratedColumn()
    id: number

    @IsString()
    @MinLength(8)
    @MaxLength(40)
    @DColumn()
    title: string

    @IsOptional()
    @IsString()
    @MaxLength(255)
    @DColumn()
    description: string

    @CreateDateColumn()
    createdAt: Date

    @DColumn()
    deadline: Date

    @IsString()
    @DColumn()
    status: string

    @ManyToOne(type => Column)
    @JoinColumn()
    column: Column
}