import express from 'express';
import morgan from 'morgan';
import amenitiesRouter from './routes/amenities.routes';
import citiesRouter from './routes/cities.routes';
import rentalRouter from './routes/rental.routes';
import statesRouter from './routes/states.routes';
import cors from 'cors';

class App {
  public app: express.Application = express();

  constructor() {
    this.app.use(express.json());
    this.app.use(morgan('dev'));
    this.app.use(cors());

    this.app.use('/rental', rentalRouter);
    this.app.use('/amenities', amenitiesRouter);
    this.app.use('/cities', citiesRouter);
    this.app.use('/states', statesRouter);
  }
}

const app = new App().app;
export default app;
