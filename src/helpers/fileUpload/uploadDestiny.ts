import { ProtectedRequest } from 'app-request';
import { Response, NextFunction } from 'express';

const uploadMediaFilesToThisFolder =
  (fodlerName: string) => (req: ProtectedRequest, res: Response, next: NextFunction) => {
    req.params.mediaFolderName = fodlerName;
    next();
  };

export default uploadMediaFilesToThisFolder;
