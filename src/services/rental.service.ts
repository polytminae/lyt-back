import GetRentalResult from '../interfaces/GetRentalResult.interface';
import RentalArrFilters from '../interfaces/RentalArrFilters.interface';
import RentalNumericFilters from '../interfaces/RentalNumericFilters.interface';
import connection from '../models/connection';
import RentalModel from '../models/rental.model';

export default class RentalService {
  public model: RentalModel;

  constructor() {
    this.model = new RentalModel(connection);
  }

  public async getByPage(
    page: number,
    numerics: RentalNumericFilters,
    arrFilters: RentalArrFilters
  ): Promise<GetRentalResult> {
    const response = await this.model.getByPage(page, numerics, arrFilters);
    return response;
  }
}
