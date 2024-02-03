import {
  Controller,
  Post,
  Get,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  ParseFilePipeBuilder,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Get()
  getHello(): string {
    return `<h1>Xin chào thế giới!!</h1>`; // means "Hello World" in Vietnamese
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png)$/, // only allow jpg, jpeg, png
        })
        .addMaxSizeValidator({ maxSize: 1000000 }) // 1MB
        .build(),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
    return this.uploadService.uploadFile(file);
  }

  @Post('multiple')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadMultipleFiles(
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png)$/, // only allow jpg, jpeg, png
        })
        .addMaxSizeValidator({ maxSize: 500000 }) // 5MB
        .build(),
    )
    files: Array<Express.Multer.File>,
  ) {
    console.log(files);
    return this.uploadService.uploadMultipleFiles(files);
  }
}
