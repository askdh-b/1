import { IsNotEmpty, IsPositive, IsString, MaxLength, MinLength } from "class-validator";

export class ColumnDto {

    @IsNotEmpty()
    @IsPositive()
    id: number

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(40)
    title: string
}