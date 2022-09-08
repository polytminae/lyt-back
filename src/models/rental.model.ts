import { Pool } from 'mysql2/promise';
import SQLRentalResponse from '../interfaces/SQLRentalResponse.interface';
import Rental from '../interfaces/Rental.interface';
import GetRentalResult from '../interfaces/GetRentalResult.interface';
import RentalNumericFilters from '../interfaces/RentalNumericFilters.interface';

export default class RentalModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  private formatRental(response: SQLRentalResponse): Rental {
    return {
      id: response.id,
      area: response.area,
      bedrooms: response.bedrooms,
      bathrooms: response.bathrooms,
      parking: response.parking,
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

  private selectFields = [
    're.*',
    'ad.*',
    'ci.name AS city_name',
    'st.name AS state_name',
    'st.short',
    'CEILING(COUNT(*) OVER() / 20) AS page_count',
  ];

  private formatResponse = (page: number, response: SQLRentalResponse[]) => ({
    page,
    pageTotal: Number(response[0]?.page_count),
    rental: response.map(this.formatRental),
  });

  private buildFilters(
    numerics: RentalNumericFilters,
    amenities: string[]
  ): string {
    const filters = [];

    if (amenities.length > 0)
      filters.push(
        `am_re.amenity_id IN (${Array(amenities.length).fill('?').join()})`
      );

    let key: keyof typeof numerics;
    for (key in numerics) {
      const filter = numerics[key];

      if (typeof filter === 'object') {
        filters.push(
          `re.${key} BETWEEN ${filter.min || '0'} AND ${filter.max || '~0'}`
        );
      } else {
        filters.push(`re.${key} ${filter < 4 ? '=' : '>='} ${filter || '0'}`);
      }
    }

    return filters.join(' AND ');
  }

  public async getByPage(
    page: number,
    numerics: RentalNumericFilters,
    amenities: string[]
  ): Promise<GetRentalResult> {
    const OFFSET = (page - 1) * 20;
    const filters = this.buildFilters(numerics, amenities);
    const [response] = await this.connection.execute(
      `
      SELECT ${this.selectFields}
      FROM rental AS re
        INNER JOIN amenities_rental AS am_re ON re.id = am_re.rental_id
        INNER JOIN address AS ad ON re.address_id = ad.id
        INNER JOIN cities AS ci ON ad.city_id = ci.id
        INNER JOIN states AS st ON ci.state_id = st.id
      ${filters && 'WHERE'} ${filters}
      ${
        amenities.length > 0
          ? `GROUP BY re.id HAVING COUNT(am_re.amenity_id) = ${amenities.length}`
          : ''
      }
      ORDER BY re.id
      LIMIT 20 OFFSET ?;
      `,
      [...amenities, OFFSET.toString()]
    );

    return this.formatResponse(page, response as SQLRentalResponse[]);
  }
}
