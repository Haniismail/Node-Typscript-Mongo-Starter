import fs from 'fs';

export const getFileType = (filename: string, mimetype: string): string => {
  let ext: string;
  if (mimetype) {
    ext = mimetype.split('/')[1];
  } else {
    ext = filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
  }
  switch (ext) {
    case 'jpg':
    case 'jpeg':
    case 'jfif':
    case 'png':
    case 'gif':
    case 'bmp':
    case 'svg':
      return 'image';
    case 'mp3':
    case 'wav':
    case 'ogg':
    case 'm4a':
      return 'audio';
    case 'mp4':
    case 'avi':
    case 'webm':
    case 'wmv':
    case 'flv':
      return 'video';
    case 'pdf':
      return 'document';
    case 'doc':
    case 'docx':
      return 'word';
    case 'xls':
    case 'xlsx':
      return 'excel';
    case 'ppt':
    case 'pptx':
      return 'powerpoint';
    default:
      return 'unknown';
  }
};

export const createFolder = (folderpath: string) => {
  if (!fs.existsSync(folderpath)) {
    fs.mkdirSync(folderpath);
  }
};

export const createTreeFolder = (folderpath: string) => {
  const folders = folderpath.split('/');
  let folder = '';
  folders.forEach((f) => {
    folder += `${f}/`;
    createFolder(folder);
  });
};
