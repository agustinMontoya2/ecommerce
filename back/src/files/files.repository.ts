import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class FilesRepository {
  uploadFile(file): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => (error ? reject(error) : resolve(result)),
      );
      toStream(file.buffer).pipe(upload);
    });
  }
}
