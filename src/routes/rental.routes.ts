import { Router } from 'express';
import RentalController from '../controllers/rental.controller';
import extractNumericsFromQuery from '../middlewares/extractNumericsFromQuery';
import validateArrFilters from '../middlewares/validateArrFilters';

const rentalRouter = Router();

const controller = new RentalController();

rentalRouter.use(extractNumericsFromQuery);
rentalRouter.use(validateArrFilters);
rentalRouter.get('/', controller.getRental);

export default rentalRouter;
