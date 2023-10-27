import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    @MinLength(4)
    @MaxLength(40)
    @Column({unique: true})
    username: string;

    @IsEmail()
    @MinLength(5)
    @MaxLength(40)
    @Column({unique: true})
    email: string;

    @IsString()
    @MinLength(2)
    @MaxLength(40)
    @Column()
    firstname: string;

    @IsString()
    @MinLength(2)
    @MaxLength(40)
    @Column()
    lastname: string;

    @IsString()
    @Column()
    password_hash: string;
}