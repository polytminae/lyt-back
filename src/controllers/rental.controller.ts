import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import RentalService from '../services/rental.service';

export default class RentalController {
  private RentalService: RentalService;

  constructor() {
    this.RentalService = new RentalService();
  }

  public getByPage = async (req: Request, res: Response) => {
    const { page } = req.query;
    const response = await this.RentalService.getByPage(Number(page) || 1);
    res.status(StatusCodes.OK).json(response);
  };
}
