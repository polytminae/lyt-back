import { Pool } from 'mysql2/promise';
import City from '../interfaces/City.interface';

export default class CitiesModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<City[]> {
    const [response] = await this.connection.execute(
      `SELECT ci.id, ci.name, st.short 
       FROM cities AS ci 
        INNER JOIN states AS st ON ci.state_id = st.id 
      ORDER BY ci.id`
    );
    return response as City[];
  }
}
