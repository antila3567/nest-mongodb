import { TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductModel } from './product.model';

@Module({
  controllers: [ProductController],
  imports: [
	TypegooseModule.forFeature([
		{
		typegooseClass: ProductModel,
		schemaOptions: {
			collection: 'Product',
		},
		},
	]),
  ],
})
export class ProductModule {}
