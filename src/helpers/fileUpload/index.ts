import { Request, Response, NextFunction } from 'express';
import multer, { FileFilterCallback, MulterError } from 'multer';
import { createFolder, getFileType } from './file.utils';
import { BadRequestResponse } from '../../core/ApiResponse';

export default class FileUploadHandler {
  private upload: multer.Multer;

  constructor() {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        createFolder('./public');
        createFolder('./public/uploads');

        const generatedFolder = getFileType('', file.mimetype);
        const dynamicFolder = req.params.mediaFolderName;
        if (dynamicFolder) {
          createFolder(`./public/uploads/${dynamicFolder}`);
          cb(null, `./public/uploads/${dynamicFolder}/`);
        } else {
          createFolder(`./public/uploads/${generatedFolder}`);
          cb(null, `./public/uploads/${generatedFolder}/`);
        }
      },
      filename: function (req, file, cb) {
        // rename the file with the field name and the current date
        const generatedFolder = getFileType('', file.mimetype);
        const dynamicFolder = req.params.mediaFolderName;
        if (dynamicFolder) {
          cb(
            null,
            `${dynamicFolder}-${Date.now()}.${file.originalname
              .split('.')
              .pop()}`
          );
        } else {
          cb(
            null,
            `${generatedFolder}-${Date.now()}.${file.originalname
              .split('.')
              .pop()}`
          );
        }
      },
    });

    const fileFilter = (
      req: Request,
      file: Express.Multer.File,
      cb: FileFilterCallback
    ) => {
      const allowedMimeTypes = [
        'image/jpeg',
        'image/jpg',
        'image/pjpeg',
        'image/svg+xml',
        'image/png',
        'image/webp',
        'image/gif',
        'image/jpg',
        'video/mp4',
        'video/avi',
        'video/mpeg',
        'video/ogg',
        'video/webm',
        'video/mov',
        'audio/mpeg',
        'audio/mp3',
        'audio/wav',
        'audio/ogg',
        'application/pdf',
      ];
      if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type'));
      }
    };

    this.upload = multer({ storage, fileFilter });
  }

  public handleFileUpload = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    this.upload.single('file')(req, res, function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      // File has been uploaded successfully
      return res.json({ message: 'File uploaded successfully' });
    });
  };

  public handleSingleFileUpload(
    fieldName: string
  ): (req: Request, res: Response, next: NextFunction) => void {
    return (req: Request, res: Response, next: NextFunction) => {
      this.upload.single(fieldName)(req, res, (err: any) => {
        if (err instanceof MulterError) {
          return next(new BadRequestResponse(err.message));
        }
        if (err) {
          return next(new BadRequestResponse(err.message));
        }
        next();
      });
    };
  }

  public handleMultipleFileUpload(): (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void {
    return (req: Request, res: Response, next: NextFunction) => {
      this.upload.array('files')(req, res, (err: any) => {
        if (err instanceof MulterError) {
          return next(new BadRequestResponse(err.message));
        }
        if (err) {
          return next(new BadRequestResponse(err.message));
        }
        next();
      });
    };
  }
}
