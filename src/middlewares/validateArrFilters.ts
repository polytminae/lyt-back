import { NextFunction, Request, Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export default function validateArrFilters(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { am, state, city } = req.query as Record<string, string>;

  const filters = {
    am: am?.split(',') || [],
    state: state?.split(',') || [],
    city: city?.split(',') || [],
  };

  if (
    !Object.values(filters).every((arr) =>
      arr.every((id) => Boolean(Number(id)))
    )
  ) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: ReasonPhrases.BAD_REQUEST,
    });
  }

  req.body.arrFilters = filters;

  next();
}
