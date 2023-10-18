import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { CreatePostDto, ExtendPostDto } from './dto/create-post-dto';
import { FindPostDto } from './dto/find-post-dto';
import { PostsService } from './posts.service';
import {POST_IS_NOT_FOUND, THERE_ARE_NO_POSTS} from './posts.constants'

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreatePostDto) {
    return this.postsService.create(dto);
  }

  @Get()
  async getAllPosts(): Promise<CreatePostDto[]> {
    const posts = await this.postsService.findAllPosts();

    if (!posts.length) {
      throw new NotFoundException(THERE_ARE_NO_POSTS);
    }

    return posts;
  }

  @Get(':id')
  async getPostById(@Param('id', IdValidationPipe) id:FindPostDto): Promise<CreatePostDto> {
    const foundPost = await this.postsService.findPostById(id);

    if (!foundPost) {
      throw new NotFoundException(POST_IS_NOT_FOUND);
    }

    return foundPost;
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updatePost(@Body() dto: CreatePostDto, @Param('id', IdValidationPipe) id:FindPostDto)  {
    const updatedPost = await this.postsService.updatePostById(dto, id)

    if (!updatedPost) {
      throw new NotFoundException(POST_IS_NOT_FOUND);
    }

    return updatedPost;
  }


  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePostById(@Param('id', IdValidationPipe) id: FindPostDto) {
     await this.postsService.deletePostById(id)

     return 'Deleted successfully'
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/extend-post/:id')
  async extendPost(@Body() dto: ExtendPostDto, @Param('id', IdValidationPipe) id:FindPostDto)  {
    const updatedPost = await this.postsService.extendPost(dto, id)

    if (!updatedPost) {
      throw new NotFoundException(POST_IS_NOT_FOUND);
    }

    return updatedPost;
  }
}
