import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';
import { UploadResponse } from './upload.response';

@Injectable()
export class UploadService {
  uploadFile(file: Express.Multer.File): Promise<UploadResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { folder: 'uploads' },
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        },
      );

      streamifier.createReadStream(file.buffer).pipe(upload);
    });
  }

  uploadMultipleFiles(files: Express.Multer.File[]): Promise<UploadResponse[]> {
    return Promise.all(files.map((file) => this.uploadFile(file)));
  }
}
