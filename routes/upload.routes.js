import express from 'express';
const multer = require('multer');
import uploadController from '../controllers/Chat/upload';
const storage = multer.diskStorage({
destination: function (req, file, cb) {
    console.log('../public/upload/images');
    cb(null, './src/public/upload/images')
  },
  filename: function (req, file, cb) {
    const whitelist = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/webp'
    ]
    if (!whitelist.includes(file.mimetype)) {
      return cb(new Error('file is not allowed'))
    }
    const rand = Math.random();
    const now = Date.now();
    const fileName = now +  '_' + rand + '_user_' + req.body.user_upload_id + '_' + file.originalname;
    req.body.fileName = fileName;
    cb(null, fileName)
  }
});
const upload = multer({ storage: storage });

const router = express.Router();

const uploadRoute = (app) => {
    router.post('/images', upload.single('file'), uploadController.uploadImage);
    return app.use('/api/upload', router);
};

export default uploadRoute;