import City from '../interfaces/City.interface';
import CitiesModel from '../models/cities.model';
import connection from '../models/connection';

export default class CitiesService {
  public model: CitiesModel;

  constructor() {
    this.model = new CitiesModel(connection);
  }

  public async getAll(): Promise<City[]> {
    const cities = await this.model.getAll();
    return cities;
  }
}
