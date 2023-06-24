import { Router } from "express";
import { getapackage, getpackages } from "../handlers/Packages/Package";
import { Addtrip, getallquery, getaquery } from "../handlers/Trips/Trip";
import { handleInputErrors } from "./Middleware/expressValidation";

const PublicApiRouter =  Router();

PublicApiRouter.get('/getpackages', getpackages);
PublicApiRouter.get('/getpackage/:id', getapackage)

PublicApiRouter.get('/getmytrips', getallquery)
PublicApiRouter.get('/getmytrip/:id', getaquery)
PublicApiRouter.post('/addmytrip', handleInputErrors, Addtrip)

export default PublicApiRouter;