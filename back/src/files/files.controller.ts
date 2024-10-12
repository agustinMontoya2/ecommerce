import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UseGuards,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/Auth/AuthGuard.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/custom-validators/roles.decorator';
import { Role } from 'src/Users/dto/create-user.dto';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiTags('files')
  @Post('uploadImage/:id')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000,
            message: 'Max file size is 200kb',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param('id') product_id: string,
  ) {
    return this.filesService.uploadFile(file, product_id);
  }
}
