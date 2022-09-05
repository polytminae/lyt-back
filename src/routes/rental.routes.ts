import { Router } from 'express';
import RentalController from '../controllers/rental.controller';
import { verifyNumerics } from '../middlewares/handleRentalFilters';

const rentalRouter = Router();

const controller = new RentalController();

rentalRouter.use(verifyNumerics);
rentalRouter.get('/', controller.getRental);

export default rentalRouter;
