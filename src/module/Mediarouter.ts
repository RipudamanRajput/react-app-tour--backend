import { Router } from 'express';
import { deletefile, getallimages } from '../handlers/Media/Media';

const Mediarouter = Router();

Mediarouter.get('/getimages', getallimages)
Mediarouter.get('/getimage/:id',)
Mediarouter.post('/addimage',)
Mediarouter.put('/updateimage/:id',)
Mediarouter.delete('/removeimage/:id',deletefile)

export default Mediarouter;