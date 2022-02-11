import { Module } from '@nestjs/common';
import { FilesManagerService } from './files-manager.service';

@Module({
  providers: [FilesManagerService],
  exports: [FilesManagerService]
})
export class FilesManagerModule {}
