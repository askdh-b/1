import { IsNotEmpty, IsPositive, MaxLength, MinLength } from "class-validator";

export class CommentDto {
    @IsNotEmpty()
    @IsPositive()
    id: number

    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(4000)
    content: string
}