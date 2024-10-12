import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { FilesRepository } from './files.repository';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  controllers: [FilesController],
  providers: [FilesService, FilesRepository, CloudinaryConfig],
})
export class FilesModule {}
