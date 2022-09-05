import { NextFunction, Request, Response } from 'express';
import RentalNumericFilters from '../interfaces/RentalNumericFilters.interface';

export const verifyNumerics = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const keys = [
    'bedrooms',
    'bathrooms',
    'parking',
    'priceMin',
    'priceMax',
    'areaMin',
    'areaMax',
  ];

  if (keys.some((key) => Boolean(req.query[key]))) {
    const numerics: RentalNumericFilters = {
      price: {
        min: Number(req.query.priceMin),
        max: Number(req.query.priceMax),
      },
      area: {
        min: Number(req.query.areaMin),
        max: Number(req.query.areaMax),
      },
      bedrooms: Number(req.query.bedrooms),
      bathrooms: Number(req.query.bathrooms),
      parking: Number(req.query.parking),
    };

    req.body.numerics = numerics;
  }

  next();
};
