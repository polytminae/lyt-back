import Rental from '../interfaces/Rental.interface';
import connection from '../models/connection';
import RentalModel from '../models/rental.model';

export default class RentalService {
  public model: RentalModel;

  constructor() {
    this.model = new RentalModel(connection);
  }

  public async getByPage(page: number): Promise<Rental[]> {
    const rental = await this.model.getByPage(page);
    return rental;
  }
}
