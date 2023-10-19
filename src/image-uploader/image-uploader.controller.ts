import { FileInterceptor } from '@nestjs/platform-express';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ImageUploaderService } from './image-uploader.service';

@Controller('image-uploader')
export class ImageUploaderController {
  constructor(private readonly imageUploaderService: ImageUploaderService) {}

  @Post(':id')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Param('id') id:string) {
    return this.imageUploaderService.uploadFile(file, id)
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() dto: {path: string}) {
    return this.imageUploaderService.remove(id, dto.path);
  }
}
