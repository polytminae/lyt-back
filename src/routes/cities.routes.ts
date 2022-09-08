import { Router } from 'express';
import CitiesController from '../controllers/cities.controller';

const citiesRouter = Router();
const controller = new CitiesController();

citiesRouter.get('/', controller.getAll);

export default citiesRouter;
