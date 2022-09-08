import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CitiesService from '../services/cities.service';

export default class CitiesController {
  private service: CitiesService;

  constructor() {
    this.service = new CitiesService();
  }

  public getAll = async (_req: Request, res: Response) => {
    const response = await this.service.getAll();
    res.status(StatusCodes.OK).json(response);
  };
}
