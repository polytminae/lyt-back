import GetRentalResult from '../interfaces/GetRentalResult.interface';
import RentalNumericFilters from '../interfaces/RentalNumericFilters.interface';
import connection from '../models/connection';
import RentalModel from '../models/rental.model';

export default class RentalService {
  public model: RentalModel;

  constructor() {
    this.model = new RentalModel(connection);
  }

  public async getByPage(page: number): Promise<GetRentalResult> {
    const rental = await this.model.getByPage(page);
    return rental;
  }

  public async getByNumerics(
    page: number,
    numerics: RentalNumericFilters
  ): Promise<GetRentalResult> {
    const rental = await this.model.getByNumerics(page, numerics);
    return rental;
  }

  public async getByAmenities(
    page: number,
    amenities: string[]
  ): Promise<GetRentalResult> {
    const rental = await this.model.getByAmenities(page, amenities);
    return rental;
  }
}
