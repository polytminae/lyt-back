import State from '../interfaces/State.interface';
import connection from '../models/connection';
import StatesModel from '../models/states.model';

export default class StatesService {
  public model: StatesModel;

  constructor() {
    this.model = new StatesModel(connection);
  }

  public async getAll(): Promise<State[]> {
    const cities = await this.model.getAll();
    return cities;
  }
}
