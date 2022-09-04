import express from 'express';
import morgan from 'morgan';

class App {
  public app: express.Application = express();

  constructor() {
    this.app.use(express.json());
    this.app.use(morgan('dev'));
  }
}

const app = new App().app;
export default app;
