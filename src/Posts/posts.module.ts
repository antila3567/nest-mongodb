import { TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';
import { PostsModel } from './posts.model';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';

@Module({
  controllers: [PostsController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: PostsModel,
        schemaOptions: {
          collection: 'Posts',
        },
      },
    ]),
  ],
  providers: [PostsService],
})
export class PostsModule {}
