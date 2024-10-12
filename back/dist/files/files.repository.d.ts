import { UploadApiResponse } from 'cloudinary';
export declare class FilesRepository {
    uploadFile(file: any): Promise<UploadApiResponse>;
}
