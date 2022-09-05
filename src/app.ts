import express from 'express';
import morgan from 'morgan';
import amenitiesRouter from './routes/amenities.routes';
import rentalRouter from './routes/rental.routes';

class App {
  public app: express.Application = express();

  constructor() {
    this.app.use(express.json());
    this.app.use(morgan('dev'));

    this.app.use('/rental', rentalRouter);
    this.app.use('/amenities', amenitiesRouter);
  }
}

const app = new App().app;
export default app;
