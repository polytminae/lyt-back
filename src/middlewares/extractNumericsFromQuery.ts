import { NextFunction, Request, Response } from 'express';
import RentalNumericFilters from '../interfaces/RentalNumericFilters.interface';

const extractFiltersFromQuery = ({
  query: { bedrooms, bathrooms, parking, price, area, rent, hoa },
}: Request) => ({
  bedrooms,
  bathrooms,
  parking,
  price,
  rent,
  hoa,
  area,
});

const extractValidNumbers = (filters: Record<string, unknown>) => {
  const validFilters: { [key: string]: number | object } = {};

  Object.keys(filters).forEach((key) => {
    if (typeof filters[key] === 'object') {
      return (validFilters[key] = extractValidNumbers(
        filters[key] as Record<string, unknown>
      ));
    }
    const num = Number(filters[key]);
    if (!Number.isNaN(num)) validFilters[key] = num;
  });

  return validFilters;
};

export default function extractNumericsFromQuery(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const filters = extractFiltersFromQuery(req);
  req.body.numerics = extractValidNumbers(filters) as RentalNumericFilters;

  next();
}
