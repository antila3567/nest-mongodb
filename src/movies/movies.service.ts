import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectModel } from 'nestjs-typegoose';
import { MoviesModel } from './movies.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { UserModel } from 'src/auth/user.model';
import { USER_NOT_FOUND } from 'src/auth/auth.constants';
import { EM_MOVIE_DID_NOT_ADD } from './movies.constants';
import { Types, isValidObjectId } from 'mongoose';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(MoviesModel)
    private readonly moviesModel: ModelType<MoviesModel>,
    @InjectModel(UserModel)
    private readonly userModel: ModelType<UserModel>
  ) { }
  async create(createMovieDto: CreateMovieDto, id: string) {
    const isUserFound = await this.userModel.findById(id)

    if (!isUserFound) {
      throw new BadRequestException(USER_NOT_FOUND)
    }

    const addedMovie = await this.moviesModel.create(createMovieDto)
    const { _id: movieId = null } = addedMovie;

    if (!movieId) {
      throw new InternalServerErrorException(EM_MOVIE_DID_NOT_ADD)
    }

    const updatedUserEntity = {
      lastAddedMovieId: movieId,
      addedMoviesIds: [...isUserFound.addedMoviesIds, movieId]
    }

    await this.userModel.findByIdAndUpdate(id, updatedUserEntity, { new: true })

    return addedMovie;
  }

  findAll() {
    return this.moviesModel.find()
  }
  // $match: { _id: { $in: ids } }
  findMoviesWithUser(id: string) {
    const aggregation = this.userModel.aggregate([
      {
        $match: {
          _id: Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: 'movies',
          localField: 'addedMoviesIds',
          foreignField: '_id',
          as: 'allUserMovies'
        }
      },
      {
        $addFields: {
          reviewAvg: {
            $avg: '$allUserMovies.rating'
          },
        },
      },
      {
        $project: {
          _id: 0,
          "email": 1,
          "reviewAvg": 1,
          "allUserMovies": 1,
        }
      },
      {
        $sort: { "allUserMovies.year": 1 }
      }
    ])

    return aggregation;
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
