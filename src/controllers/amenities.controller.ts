import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import AmenitiesService from '../services/amenities.service';

export default class AmenitiesController {
  private service: AmenitiesService;

  constructor() {
    this.service = new AmenitiesService();
  }

  public getByRentalId = async (req: Request, res: Response) => {
    const { rentalId } = req.params;
    const response = await this.service.getByRentalId(rentalId);
    res.status(StatusCodes.OK).json(response);
  };
}
