import path from "path";
import multer from 'multer';
import express from 'express';

// const app = express();

// function Uploadassests(req, res, next) {
    // app.use('/uploads', express.static(path.join(__dirname, '../../../src/Uploadmedia')));

    const storage = multer.diskStorage({
        destination: (req, res, cb) => {
            cb(null, 'src/Uploadmedia')

        },
        filename: (req, file, cb) => {
            cb(null, (file.originalname + ".png"));
        }
    });

    const fileFilter = (req, file, cb) => {
        if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }

   let Upload= multer(
        {
            storage,
            fileFilter
        }
    );

    // next();
// }

export default Upload.array('image')