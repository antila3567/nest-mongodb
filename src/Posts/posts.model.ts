import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface PostsModel extends Base {}

export class PostsModel extends TimeStamps {
  @prop()
  author: string;

  @prop()
  title: string;

  @prop()
  content: string;

  @prop()
  country: string;

  @prop({ type: () => [String] })
  tags: string[];
}
