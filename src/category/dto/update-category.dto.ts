import { IsOptional, IsString, Length } from "class-validator";

export class UpdateCategoryDto {
    @IsOptional()
    @IsString()
    @Length(1, 255, {message: 'Name must be between 1 and 255 characters.'})
    name?: string;
}