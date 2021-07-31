import { TopPageModel } from './top-page.model';
import { TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { TopPageService } from './top-page.service';

@Module({
  controllers: [TopPageController],
  imports: [
	TypegooseModule.forFeature([
		{
		typegooseClass: TopPageModel,
		schemaOptions: {
			collection: 'TopPage',
		},
		},
	]),
  ],
  providers: [TopPageService],
})
export class TopPageModule {}
