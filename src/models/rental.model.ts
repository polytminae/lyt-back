import { Pool } from 'mysql2/promise';
import SQLRentalResponse from '../interfaces/SQLRentalResponse';
import Rental from '../interfaces/Rental.interface';
import GetRentalResult from '../interfaces/GetRentalResult.interface';

export default class RentalModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  private formatRental(response: SQLRentalResponse): Rental {
    return {
      id: response.id,
      area: response.area,
      rooms: response.rooms,
      bathrooms: response.bathrooms,
      parking_spaces: response.parking_spaces,
      floor: response.floor,
      animal: Boolean(response.animal),
      furnished: Boolean(response.furnished),
      hoa: response.hoa,
      rent: response.rent,
      tax: response.tax,
      fireInsurance: response.fire_insurance,
      address: {
        id: response.address_id,
        latitude: response.latitude,
        longitude: response.longitude,
        neighborhood: response.neighborhood,
        zipcode: response.zipcode,
        street: response.street,
        streetNumber: response.number,
        city: response.city_name,
        state: {
          long: response.state_name,
          short: response.short,
        },
      },
    };
  }

  public async getByPage(page: number): Promise<GetRentalResult> {
    const OFFSET = (page - 1) * 20;
    const [response] = await this.connection.execute(
      `
      SELECT re.*,
        ad.latitude,
        ad.longitude,
        ad.zipcode,
        ad.street,
        ad.number,
        ci.name AS city_name,
        st.name AS state_name,
        st.short,
        CEILING(COUNT(*) OVER() / 20) AS page_count
      FROM rental AS re
        INNER JOIN address AS ad ON re.address_id = ad.id
        INNER JOIN cities AS ci ON ad.city_id = ci.id
        INNER JOIN states AS st ON ci.state_id = st.id
      ORDER BY re.id
      LIMIT 20 OFFSET ?;
      `,
      [OFFSET.toString()]
    );

    return {
      page,
      pageTotal: Number((response as SQLRentalResponse[])[0]?.page_count),
      rental: (response as SQLRentalResponse[]).map(this.formatRental),
    };
  }
}
