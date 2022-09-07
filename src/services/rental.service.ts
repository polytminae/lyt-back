import GetRentalResult from '../interfaces/GetRentalResult.interface';
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
    amenities: string[]
  ): Promise<GetRentalResult> {
    const response = await this.model.getByPage(page, numerics, amenities);
    return response;
  }
}
