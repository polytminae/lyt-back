import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export default function validateAmenities(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const am = req.query.am as string;

  if (am) {
    const amenities = am.split(',');

    if (!amenities.every((id) => Boolean(Number(id)))) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Invalid "am" field',
      });
    }
    req.body.amenities = amenities;
  }

  next();
}
