import { Router } from 'express';
import AmenitiesController from '../controllers/amenities.controller';

const amenitiesRouter = Router();

const controller = new AmenitiesController();

amenitiesRouter.get('/rental/:rentalId', controller.getByRentalId);

export default amenitiesRouter;
