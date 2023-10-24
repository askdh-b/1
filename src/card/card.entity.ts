import { Column } from "src/column/column.entity";
import { Column as DColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Card {
    @PrimaryGeneratedColumn()
    id: number

    @DColumn()
    title: string

    @DColumn()
    description: string

    @DColumn()
    deadline: string

    status: string

    @ManyToOne(type => Column)
    @JoinColumn()
    column: Column
}