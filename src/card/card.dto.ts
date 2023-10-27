import { IsNotEmpty, IsOptional, IsPositive, IsString, MaxLength, MinLength } from "class-validator";

export class CardDto {
    @IsNotEmpty()
    @IsPositive()
    id: number

    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(40)
    title: string

    @IsOptional()
    @MaxLength(255)
    description: string

    @IsString()
    @IsNotEmpty()
    deadline: string

    @IsString()
    @IsNotEmpty()
    status: string
}