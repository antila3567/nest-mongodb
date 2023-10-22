import { prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';

export interface UserModel extends Base { }

export class UserModel extends TimeStamps {
  @prop({ unique: true })
  email: string;

  @prop()
  passwordHash: string;

  @prop({ required: false })
  lastAddedMovieId: Types.ObjectId;

  @prop({ required: false })
  addedMoviesIds: Types.ObjectId[]
}
