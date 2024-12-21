import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty({message: 'Name is required.'})
    @Length(1, 255, {message: 'Name must be between 1 to 255 characters.'})
    name: string;
}