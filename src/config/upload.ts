import path from 'path';
import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';

const configDirectory = (folder = ''): string => {
  if (!folder) {
    return path.resolve(__dirname, '..', '..', 'tmp');
  }
  return path.resolve(__dirname, '..', '..', 'tmp', folder);
};

interface MulterConfig {
  directory: string;
  storage: StorageEngine;
}

const configUpload = (folder = ''): MulterConfig => {
  const tmpPath = configDirectory(folder);
  return {
    directory: tmpPath,

    storage: multer.diskStorage({
      destination: tmpPath,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  };
};

export default configUpload;
