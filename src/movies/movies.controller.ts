import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { Types } from 'mongoose';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) { }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe)
  @Post(':id')
  create(
    @Body() createMovieDto: CreateMovieDto,
    @Param('id', IdValidationPipe) id: string
  ) {
    return this.moviesService.create(createMovieDto, id);
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @UsePipes(new ValidationPipe)
  @Get('/specific-user/:id')
  findMoviesWithUser(@Param('id', IdValidationPipe) id: string) {
    return this.moviesService.findMoviesWithUser(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }
}
