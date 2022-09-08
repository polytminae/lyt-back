import { Pool } from 'mysql2/promise';
import State from '../interfaces/State.interface';

export default class StatesModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<State[]> {
    const [response] = await this.connection.execute('SELECT * FROM states');
    return response as State[];
  }
}
