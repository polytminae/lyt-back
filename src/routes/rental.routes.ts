import { Router } from 'express';
import RentalController from '../controllers/rental.controller';
import extractNumericsFromQuery from '../middlewares/extractNumericsFromQuery';
import validateAmenities from '../middlewares/validateAmenities';

const rentalRouter = Router();

const controller = new RentalController();

rentalRouter.use(extractNumericsFromQuery);
rentalRouter.use(validateAmenities);
rentalRouter.get('/', controller.getRental);

export default rentalRouter;
