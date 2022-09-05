import { Pool } from 'mysql2/promise';
import Amenity from '../interfaces/Amenity.interface';

export default class AmenitiesModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getByRentalId(rental_id: string): Promise<Amenity[]> {
    const [response] = await this.connection.execute(
      `
      SELECT am.id,
        am.name,
        cat.name AS category
      FROM amenities_rental AS am_re
        INNER JOIN amenities AS am ON am_re.amenity_id = am.id
        INNER JOIN categories AS cat ON am.category_id = cat.id
      WHERE am_re.rental_id = ?
      `,
      [rental_id]
    );
    return response as Amenity[];
  }

  public async getAll(): Promise<Amenity[]> {
    const [response] = await this.connection.execute(
      `
      SELECT am.id,
        am.name,
        cat.name AS category
      FROM amenities AS am
        INNER JOIN categories AS cat ON am.category_id = cat.id;`
    );
    return response as Amenity[];
  }
}
