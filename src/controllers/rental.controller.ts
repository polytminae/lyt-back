import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import RentalService from '../services/rental.service';

export default class RentalController {
  private service: RentalService;

  constructor() {
    this.service = new RentalService();
  }

  public getRental = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const { numerics, arrFilters } = req.body;

    const response = await this.service.getByPage(page, numerics, arrFilters);

    if (!response.rental.length) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'Page not found',
      });
    }
    res.status(StatusCodes.OK).json(response);
  };

  public getById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Id inválido',
      });
    }

    const response = await this.service.getById(id);

    if (!response) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'Realty not found',
      });
    }

    res.status(StatusCodes.OK).json(response);
  };
}
