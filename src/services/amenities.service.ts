import Amenity from '../interfaces/Amenity.interface';
import AmenitiesModel from '../models/amenities.model';
import connection from '../models/connection';

export default class AmenitiesService {
  public model: AmenitiesModel;

  constructor() {
    this.model = new AmenitiesModel(connection);
  }

  public async getByRentalId(rental_id: string): Promise<Amenity[]> {
    const amenities = await this.model.getByRentalId(rental_id);
    return amenities;
  }

  public async getAll(): Promise<Amenity[]> {
    const amenities = await this.model.getAll();
    return amenities;
  }
}
