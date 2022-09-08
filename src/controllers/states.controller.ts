import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import StatesService from '../services/states.service';

export default class StatesController {
  private service: StatesService;

  constructor() {
    this.service = new StatesService();
  }

  public getAll = async (_req: Request, res: Response) => {
    const response = await this.service.getAll();
    res.status(StatusCodes.OK).json(response);
  };
}
