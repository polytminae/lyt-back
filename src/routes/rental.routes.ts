import { Router } from 'express';
import RentalController from '../controllers/rental.controller';

const rentalRouter = Router();

const controller = new RentalController();

rentalRouter.get('/', controller.getByPage);

export default rentalRouter;
