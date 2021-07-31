import { TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewModel } from './review.model';
import { ReviewService } from './review.service';

@Module({
  controllers: [ReviewController],
  imports: [
	TypegooseModule.forFeature([
		{
		typegooseClass: ReviewModel,
		schemaOptions: {
			collection: 'Review',
		},
		},
	]),
  ],
  providers: [ReviewService],
})
export class ReviewModule {}
