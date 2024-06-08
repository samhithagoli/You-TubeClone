"use strict";
import multer from "multer";
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});
const filefilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|mp4|avi|mkv/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
  
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only images and videos are allowed'));
    }
  };

  const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 50 }, // Limit file size to 50MB
    filefilter
  });

export default upload;
