import { ConfigService } from '@nestjs/config';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPageModel } from './top-page.model';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Param,
  Patch,
  HttpCode,
} from '@nestjs/common';

@Controller('top-page')
export class TopPageController {
  // constructor(private readonly configService;: ConfigService) {}

  @Post('create')
  async create(@Body() dto: Omit<TopPageModel, '_id'>) {
    // this.configService.get('TEST');
  }

  @Get(':id')
  async get(@Param('id') id: string) {}

  @Delete(':id')
  async delete(@Param('id') id: string) {}

  @Patch(':id')
  async Patch(@Param('id') id: string, @Body() dto: TopPageModel) {}

  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindTopPageDto) {}
}
