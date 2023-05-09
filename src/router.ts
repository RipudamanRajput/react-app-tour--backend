import { Router } from 'express';
import { handleInputErrors } from './module/Middleware/expressValidation';
import { addhotel, deleteahotel, getahotel, gethotels, updateahotel } from './handlers/Hotels/hotels';
import { addlocation, deletealocation, getalocation, getlocations, updatealocation } from './handlers/Locations/Loaction';
import { addpackage, deleteapackage, getapackage, getpackages, updateapackage } from './handlers/Packages/Package';
import UploadMedia from './module/Middleware/UploadMedia';


const router = Router();

/** for hotels **/
router.get('/gethotels', gethotels)
router.get('/gethotel/:id', getahotel)
router.post('/addhotel', UploadMedia, handleInputErrors, addhotel)
router.put('/updatehotel/:id', handleInputErrors, updateahotel)
router.delete('/removehotel/:id', deleteahotel)

/** for package **/
router.get('/getpackages', getpackages)
router.get('/getpackage/:id', getapackage)
router.post('/addpackage', handleInputErrors, addpackage)
router.put('/updatepackage/:id', handleInputErrors, updateapackage)
router.delete('/removepackage/:id', deleteapackage)

/** for loaction **/
router.get('/getloactions', getlocations)
router.get('/getloaction/:id', getalocation)
router.post('/addloaction', handleInputErrors, addlocation)
router.put('/updateloaction/:id', handleInputErrors, updatealocation)
router.delete('/removeloaction/:id', deletealocation)

/** for booking **/
router.get('/getbookings', (req, res) => { })
router.get('/getbooking/:id', (req, res) => { })
router.post('/addbooking', handleInputErrors, (req, res) => { })
router.put('/updatebooking', handleInputErrors, (req, res) => { })
router.delete('/removebooking/:id', (req, res) => { })


export default router;