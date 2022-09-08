import { Router } from 'express';
import StatesController from '../controllers/states.controller';

const statesRouter = Router();
const controller = new StatesController();

statesRouter.get('/', controller.getAll);

export default statesRouter;
