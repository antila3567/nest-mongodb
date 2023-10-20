import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

describe('PostsService', () => {
	let app: INestApplication;
	let service: PostsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [PostsService],
		}).compile();

		service = module.get<PostsService>(PostsService);
		app = module.createNestApplication();
		await app.init();
	});

	it(`/GET users`, async () => {
		return await request(app.getHttpServer()).get('/users')
			.expect(200)
			.expect({
				data: service.findAllPosts(),
			});
	});

});
