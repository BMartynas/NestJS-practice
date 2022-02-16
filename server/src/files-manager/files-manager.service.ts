import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { extname } from  'path';

@Injectable()
export class FilesManagerService {

    generateFilename(req, file, cb) {
        const filename: string = uuidv4();
        cb(null, `${filename}${extname(file.originalname)}`);
    }

    checkIfImage(req, file, callback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
    }
}
