import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';
import { ImageUploaderService } from './image-uploader.service';
import { ImageUploaderController } from './image-uploader.controller';
import { PostsModel } from 'src/Posts/posts.model';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
	controllers: [ImageUploaderController],
	providers: [ImageUploaderService, ConfigService, {
		provide: APP_GUARD,
		useClass: ThrottlerGuard
	}],
	imports: [
		ThrottlerModule.forRoot([
			{
				ttl: 60000,
				limit: 30
			}
		]),
		TypegooseModule.forFeature([
			{
				typegooseClass: PostsModel,
				schemaOptions: {
					collection: 'Posts'
				}
			}
		])
	]
})
export class ImageUploaderModule { }
