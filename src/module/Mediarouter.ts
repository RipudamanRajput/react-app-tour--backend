import { Router } from 'express';
import { addfile, deletefile, getallimages } from '../handlers/Media/Media';
import UploadMedia from './Middleware/UploadMedia';

const Mediarouter = Router();

Mediarouter.get('/getimages', getallimages)
Mediarouter.get('/getimage/:id',)
Mediarouter.post('/addimage', UploadMedia, addfile)
Mediarouter.put('/updateimage/:id',)
Mediarouter.delete('/removeimage/:id', deletefile)

export default Mediarouter;