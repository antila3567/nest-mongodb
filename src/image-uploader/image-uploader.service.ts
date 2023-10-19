import { ConfigService } from '@nestjs/config';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { PostsModel } from '../Posts/posts.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { Injectable, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { DeleteObjectCommand, PutObjectCommand, PutObjectCommandInput, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class ImageUploaderService {
	constructor(
		@InjectModel(PostsModel) 
    private readonly postModel: ModelType<PostsModel>,
		private readonly configService: ConfigService
	) {}

	private readonly BUCKET_NAME = this.configService.get('AWS_S3_BUCKET_NAME');
	private readonly AWS_REGION = this.configService.get('AWS_S3_REGION');
	private readonly AWS_ACCESS_KEY = this.configService.get('AWS_ACCESS_KEY_ID');
	private readonly AWS_SECRET_KEY = this.configService.get('AWS_SECRET_ACCESS_KEY');

	private readonly s3Client = new S3Client({
		region: this.AWS_REGION,
		credentials: {
			accessKeyId: this.AWS_ACCESS_KEY,
			secretAccessKey: this.AWS_SECRET_KEY
		}
	});

	async uploadFile(@UploadedFile() file: Express.Multer.File, id: string) {
		const location = `https://${this.BUCKET_NAME}.s3.${this.AWS_REGION}.amazonaws.com/${file.originalname}`;
		const input: PutObjectCommandInput = {
			Bucket: this.BUCKET_NAME,
			Key: file.originalname,
			Body: file.buffer,
			ContentType: file.mimetype,
			ACL: 'public-read-write'
		};
		try {
			await this.s3Client.send(new PutObjectCommand(input));
			return this.postModel.findByIdAndUpdate(id, { image: location }, { new: true });
		} catch (error) {
			return error;
		}
	}

	async remove(id: string, filePath: string) {
		const filename = filePath.substring(filePath.lastIndexOf('/') + 1);
		try {
			const res = await this.s3Client.send(
				new DeleteObjectCommand({
					Bucket: this.BUCKET_NAME,
					Key: filename
				})
			);
			const updatePost = this.postModel.findByIdAndUpdate(id, { image: null }, { new: true });
			return updatePost;
		} catch (error) {
			return error;
		}
	}
}
