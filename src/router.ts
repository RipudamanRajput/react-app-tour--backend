import { Router } from 'express';
import { handleInputErrors } from './module/Middleware/expressValidation';
import { addhotel, deleteahotel, getahotel, gethotels, updateahotel } from './handlers/Hotels/hotels';
import { addlocation, deletealocation, getalocation, getlocations, updatealocation } from './handlers/Locations/Loaction';
import { addpackage, deleteapackage, getapackage, getpackages, updateapackage } from './handlers/Packages/Package';
import UploadMedia from './module/Middleware/UploadMedia';
import { addpackagestype, deleteproducttype, getallproducttype } from './handlers/Packages/Packagetype';
import { addicludeitem, geticludeitem, removeicludeitem } from './handlers/Packages/Includeitem';
import { Addtrip, deleteaquery, getallquery, getaquery } from './handlers/Trips/Trip';
import { addbeaches, addislands, addspot, deletebeach, deleteisland, deletesport, getBeachs, getislands, getsports } from './handlers/Events/Events';
import { Addpost } from './handlers/Posts/Post';


const router = Router();

/** ------------------------------ for package **/
router.get('/getpackages', getpackages)
router.get('/getpackage/:id', getapackage)
router.post('/addpackage', UploadMedia, handleInputErrors, addpackage)
router.put('/updatepackage/:id', UploadMedia, handleInputErrors, updateapackage)
router.delete('/removepackage/:id', deleteapackage)

/** for package type  **/
router.get('/getpackagestype', getallproducttype)
router.get('/getpackagestype/:id', (req, res) => { })
router.post('/addpackagestype', handleInputErrors, addpackagestype)
router.put('/updatepackagestype', handleInputErrors, (req, res) => { })
router.delete('/removepackagestype/:id', deleteproducttype)

/** for include type **/
router.get('/geticludeitem', geticludeitem)
router.get('/geticludeitem/:id', (req, res) => { })
router.post('/addicludeitem', handleInputErrors, addicludeitem)
router.put('/updateicludeitem', handleInputErrors, (req, res) => { })
router.delete('/removeicludeitem/:id', removeicludeitem)


/** ------------------------------ for Book my trip **/
router.get('/getmytrips', getallquery)
router.get('/getmytrip/:id', getaquery)
router.post('/addmytrip', handleInputErrors, Addtrip)
router.put('/updatemytrip', handleInputErrors, (req, res) => { })
router.delete('/removemytrip/:id', deleteaquery)

/** ------------------------------- for Events **/
router.get('/getsports', getsports)
router.post('/addsport', handleInputErrors, addspot)
router.delete('/removesport/:id', deletesport)
router.get('/getislandss', getislands)
router.post('/addislands', handleInputErrors, addislands)
router.delete('/removeislands/:id', deleteisland)
router.get('/getbeaches', getBeachs)
router.post('/addbeache', handleInputErrors, addbeaches)
router.delete('/removebeache/:id', deletebeach)

/** --------------------------------  For Posts**/
router.get('/getposts', getallquery, (req, res) => { })
router.get('/getpost/:id', getaquery, (req, res) => { })
router.post('/addpost', handleInputErrors, Addpost)
router.put('/updatepost', handleInputErrors, (req, res) => { })
router.delete('/removepost/:id', deleteaquery, (req, res) => { })

/** for hotels **/
router.get('/gethotels', gethotels)
router.get('/gethotel/:id', getahotel)
router.post('/addhotel', UploadMedia, handleInputErrors, addhotel)
router.put('/updatehotel/:id', handleInputErrors, updateahotel)
router.delete('/removehotel/:id', deleteahotel)

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