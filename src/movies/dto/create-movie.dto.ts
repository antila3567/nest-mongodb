import { Type } from 'class-transformer';
import {
	ArrayNotEmpty,
	IsArray,
	IsNumber,
	IsObject,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator';

class ReviewsDto {
	@IsString()
	name: string;

	@IsString()
	text: string;

	info: {
		preferredGenre: string[]
	}
}
class DurationDto {
	@IsNumber()
	minutes: number

	@IsNumber()
	hours: number

}

export class CreateMovieDto {
	@IsString()
	title: string;

	@IsNumber()
	year: number;

	@IsNumber()
	rating: number;

	@IsString({ each: true })
	genres: string[];


	@ValidateNested({ each: true })
	@Type(() => DurationDto)
	duration: DurationDto;

	@IsArray()
	// @ArrayNotEmpty()
	@ValidateNested({ each: true })
	@Type(() => ReviewsDto)
	reviews: ReviewsDto[];
}
