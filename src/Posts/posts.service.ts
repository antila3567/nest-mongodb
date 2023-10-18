import { ModelType } from '@typegoose/typegoose/lib/types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { PostsModel } from './posts.model';
import { CreatePostDto, ExtendPostDto } from './dto/create-post-dto';
import { FindPostDto } from './dto/find-post-dto';
import { ExecSyncOptions } from 'child_process';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(PostsModel)
    private readonly postModel: ModelType<PostsModel>,
  ) {}
  async create(dto: CreatePostDto) {
    return this.postModel.create(dto);
  }
  async findAllPosts() {
    return this.postModel.find()
  }
  async findPostById(id: FindPostDto) {
    return this.postModel.findById(id)
  }
  async deletePostById(id: FindPostDto) {
    return this.postModel.findByIdAndDelete(id)
  }
  async updatePostById(dto: CreatePostDto, id: FindPostDto) {
    return this.postModel.findByIdAndUpdate(id, dto, {new:true})
  }
  async extendPost(dto: ExtendPostDto, id: FindPostDto) {
    console.log(dto,'dtro', id, "id")
    return this.postModel.findByIdAndUpdate(id, dto, {new:true})
  }
}
