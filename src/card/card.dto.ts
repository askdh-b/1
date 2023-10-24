import { IsNotEmpty, IsPositive, MaxLength, MinLength } from "class-validator";

export class CardDto {
    @IsNotEmpty()
    @IsPositive()
    id: number

    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(40)
    title: string

    @MaxLength(255)
    description: string

    @IsNotEmpty()
    deadline: string

    @IsNotEmpty()
    status: string
}