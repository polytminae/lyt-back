import { Router } from 'express';
import RentalController from '../controllers/rental.controller';
import {
  validateAmenities,
  verifyNumerics,
} from '../middlewares/handleRentalFilters';

const rentalRouter = Router();

const controller = new RentalController();

rentalRouter.use(verifyNumerics);
rentalRouter.use(validateAmenities);
rentalRouter.get('/', controller.getRental);

export default rentalRouter;
