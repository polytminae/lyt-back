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
    const { numerics, amenities } = req.body;

    const response = await this.service.getByPage(page, numerics, amenities);

    if (!response.rental.length) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'Page not found',
      });
    }
    res.status(StatusCodes.OK).json(response);
  };
}
