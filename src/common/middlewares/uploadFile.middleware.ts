import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import * as multer from 'multer';
import { storageFirebase } from 'src/configs/firebase.config';

@Injectable()
export class UploadFile implements NestMiddleware {
  private storage = multer.memoryStorage();
  private fileFilter(
    req: Request,
    file: Express.Multer.File,
    callback: multer.FileFilterCallback,
  ) {
    if (file.mimetype.startsWith('image/')) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  }

  private upload = multer({
    storage: this.storage,
    fileFilter: this.fileFilter,
    limits: {
      fileSize: 2 * 1024 * 1024,
    },
  });

  use(req: Request, res: Response, next: NextFunction) {

    this.upload.any()(req, res, async (err: any) => {
      const files = req.files as Express.Multer.File[];
      if (err) {
        console.log(err);
      }
      if (files) {
        const urls = files.map(async (item: Express.Multer.File) => {
          const metatype = {
            contentType: item.mimetype,
            name: item.originalname,
          };

          const storageRef = ref(
            storageFirebase,
            'images/' + new Date().getTime() + '_' + item.originalname,
          );

          await uploadBytes(storageRef, item.buffer, metatype);
          return await getDownloadURL(storageRef);
        });

        Promise.all(urls).then((urls) => {
          urls.forEach((url: string, index) => {
            req.body[files[index].fieldname] = url;
          });
        });
      }
      next();
    });
  }
}
