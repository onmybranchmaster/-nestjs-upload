import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadProvider } from './upload.provider';
import { UploadController } from './upload.controller';

@Module({
  controllers: [UploadController],
  providers: [UploadService, UploadProvider],
  exports: [UploadService],
})
export class UploadModule {}
