import multer from 'multer';
import { extname, resolve } from 'path';

/**
 * cb = callback
 */

const aleatorio = () => Math.floor(Math.random() * 10000 + 10000);
// primeiro parâmetro é null, segundo é o caminho até a pasta uploads
export default {
  // filtro de arquivo
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return cb(new multer.MulterError('Arquivo precisa ser PNG ou JPG'));
    }

    return cb(null, true);
  },

  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
    },
    filename: (req, file, cb) => {
      // montagem de nome de arquivo: primeiro a data e depois a extensão original do arquivo
      cb(null, `${Date.now()}_${aleatorio()}${extname(file.originalname)}`);
    },
  }),
};
