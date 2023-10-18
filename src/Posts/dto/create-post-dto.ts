
import {  IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  author: string;
  @IsString()
  title: string;
  @IsString()
  content: string;
  @IsString()
  country: string;
  @IsString({ each: true })
  tags: string[];
}
export class ExtendPostDto {
  @IsString({ each: true })
  tags: string[];
}

