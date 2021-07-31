import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { REVIEW_NOT_FOUND } from './review.constants';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserEmail } from 'src/decorators/user-email.decorator';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateReviewDto) {
	return this.reviewService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
	const deleteDoc = await this.reviewService.delete(id);
	if (!deleteDoc) {
		throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
	}
  }

  @UseGuards(JwtAuthGuard)
  @Get('byProduct/:productId')
  async getByProduct(
	@Param('productId') productId: string,
	@UserEmail() email: string,
  ) {
	return this.reviewService.findByProductId(productId);
  }
}
