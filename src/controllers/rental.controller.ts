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
    let response;

    if (amenities && numerics) {
      response = await this.service.getByNumericsAndAmenities(
        page,
        numerics,
        amenities
      );
    } else if (amenities) {
      response = await this.service.getByAmenities(page, amenities);
    } else if (numerics) {
      response = await this.service.getByNumerics(page, numerics);
    } else {
      response = await this.service.getByPage(page);
    }

    if (!response.rental.length) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'Page not found',
      });
    }
    res.status(StatusCodes.OK).json(response);
  };
}
