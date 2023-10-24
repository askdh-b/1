import { IsNotEmpty, IsPositive, MinLength } from "class-validator";

export class ColumnDto {

    @IsNotEmpty()
    @IsPositive()
    id: number

    @IsNotEmpty()
    @MinLength(8)
    title: string
}