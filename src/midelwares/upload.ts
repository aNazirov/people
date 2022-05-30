import fs from 'fs';
import multer from 'multer';
import { regMimeType } from '../utils';

const storage = multer.diskStorage({
  destination(req, file, callback) {
    if (!fs.existsSync('./uploads')) {
      fs.mkdirSync('./uploads');
    }

    callback(null, './uploads/');
  },
  filename(req, file, callback) {
    const date = new Date().getTime();
    callback(null, `${date}-${file.originalname}`);
  },
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype?.match(regMimeType)) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};
const limits = {
  fileSize: 1024 * 1024 * 5,
};

export const upload = multer({
  storage,
  fileFilter,
  limits,
});
