import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { MoviesModel } from './movies.model';
import { UserModel } from 'src/auth/user.model';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: MoviesModel,
        schemaOptions: {
          collection: 'movies',
        }
      },
      {
        typegooseClass: UserModel,
        schemaOptions: {
          collection: 'User'
        }
      }
    ])],
  controllers: [MoviesController],
  providers: [MoviesService]
})
export class MoviesModule { }
