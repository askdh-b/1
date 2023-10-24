import { IsEmail, IsNotEmpty, IsPositive, MaxLength, MinLength } from "class-validator";

export class UserDto {

    @IsNotEmpty()
    @IsPositive()
    id: number

    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(40)
    username: string

    @IsNotEmpty()
    @IsEmail()
    @MinLength(5)
    @MaxLength(60)
    email: string

    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(40)
    firstname: string

    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(40)
    lastname: string

    @IsNotEmpty()
    password: string
}