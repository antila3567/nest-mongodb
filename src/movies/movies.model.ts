
import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

class Reviews {
	@prop()
	name: string;

	@prop()
	text: string;

	@prop()
	info: {
		preferredGenre: [String],
	}
}

export interface MoviesModel extends Base { }

export class MoviesModel {
	@prop({ required: true })
	title: string;

	@prop({ required: true })
	year: number;

	@prop({ required: true })
	rating: number;

	@prop({ required: true })
	duration: {
		minutes: number,
		hours: number
	};

	@prop({ type: () => [String], required: true })
	genres: string[];

	// @prop({ type: () => [Reviews], _id: true })
	@prop({ type: () => [Reviews], _id: true })
	reviews: Reviews[];
}
