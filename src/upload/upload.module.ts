import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadProvider } from './upload.provider';

@Module({
  providers: [UploadService, UploadProvider],
  exports: [UploadService],
})
export class UploadModule {}
