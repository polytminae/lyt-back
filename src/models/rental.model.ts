import { Pool } from 'mysql2/promise';
import SQLRentalResponse from '../interfaces/SQLRentalResponse';
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
      rooms: response.rooms,
      bathrooms: response.bathrooms,
      parking: response.parking_spaces,
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

  public async getByPage(page: number): Promise<GetRentalResult> {
    const OFFSET = (page - 1) * 20;
    const [response] = await this.connection.execute(
      `
      SELECT ${this.selectFields}
      FROM rental AS re
        INNER JOIN address AS ad ON re.address_id = ad.id
        INNER JOIN cities AS ci ON ad.city_id = ci.id
        INNER JOIN states AS st ON ci.state_id = st.id
      ORDER BY re.id
      LIMIT 20 OFFSET ?;
      `,
      [OFFSET.toString()]
    );

    return this.formatResponse(page, response as SQLRentalResponse[]);
  }

  public async getByNumerics(
    page: number,
    numerics: RentalNumericFilters
  ): Promise<GetRentalResult> {
    const OFFSET = (page - 1) * 20;
    const params = [
      numerics.price.min || '0',
      numerics.price.max || '~0',
      numerics.area.min || '0',
      numerics.area.max || '~0',
      numerics.bathrooms || '0',
      numerics.bedrooms || '0',
      numerics.parking || '0',
    ];

    const [response] = await this.connection.execute(
      `
      SELECT ${this.selectFields}
      FROM rental AS re
        INNER JOIN address AS ad ON re.address_id = ad.id
        INNER JOIN cities AS ci ON ad.city_id = ci.id
        INNER JOIN states AS st ON ci.state_id = st.id
      WHERE re.rent BETWEEN ${params[0]} AND ${params[1]}
        AND re.area BETWEEN ${params[2]} AND ${params[3]}
        AND re.bathrooms ${numerics.bathrooms < 4 ? '=' : '>='} ${params[4]}
        AND re.rooms ${numerics.bedrooms < 4 ? '=' : '>='} ${params[5]}
        AND re.parking_spaces ${numerics.parking < 4 ? '=' : '>='} ${params[6]}
      ORDER BY re.id
      LIMIT 20 OFFSET ?
      `,
      [String(OFFSET)]
    );

    return this.formatResponse(page, response as SQLRentalResponse[]);
  }

  public async getByAmenities(
    page: number,
    amenities: string[]
  ): Promise<GetRentalResult> {
    const OFFSET = (page - 1) * 20;
    const [response] = await this.connection.execute(
      `
      SELECT ${this.selectFields}
      FROM rental AS re
        INNER JOIN amenities_rental AS am_re ON re.id = am_re.rental_id
        INNER JOIN address AS ad ON re.address_id = ad.id
        INNER JOIN cities AS ci ON ad.city_id = ci.id
        INNER JOIN states AS st ON ci.state_id = st.id
      WHERE am_re.amenity_id IN (${Array(amenities.length).fill('?').join()})
      GROUP BY re.id
      HAVING COUNT(am_re.amenity_id) = ${amenities.length}
      ORDER BY re.id
      LIMIT 20 OFFSET ?
      `,
      [...amenities, String(OFFSET)]
    );

    return this.formatResponse(page, response as SQLRentalResponse[]);
  }

  public async getByNumericsAndAmenities(
    page: number,
    numerics: RentalNumericFilters,
    amenities: string[]
  ): Promise<GetRentalResult> {
    const OFFSET = (page - 1) * 20;
    const params = [
      numerics.price.min || '0',
      numerics.price.max || '~0',
      numerics.area.min || '0',
      numerics.area.max || '~0',
      numerics.bathrooms || '0',
      numerics.bedrooms || '0',
      numerics.parking || '0',
    ];

    const [response] = await this.connection.execute(
      `
      SELECT ${this.selectFields}
      FROM rental AS re
        INNER JOIN amenities_rental AS am_re ON re.id = am_re.rental_id
        INNER JOIN address AS ad ON re.address_id = ad.id
        INNER JOIN cities AS ci ON ad.city_id = ci.id
        INNER JOIN states AS st ON ci.state_id = st.id
      WHERE am_re.amenity_id IN (${Array(amenities.length).fill('?').join()})
        AND re.rent BETWEEN ${params[0]} AND ${params[1]}
        AND re.area BETWEEN ${params[2]} AND ${params[3]}
        AND re.bathrooms ${numerics.bathrooms < 4 ? '=' : '>='} ${params[4]}
        AND re.rooms ${numerics.bedrooms < 4 ? '=' : '>='} ${params[5]}
        AND re.parking_spaces ${numerics.parking < 4 ? '=' : '>='} ${params[6]}
      GROUP BY re.id
      HAVING COUNT(am_re.amenity_id) = ${amenities.length}  
      ORDER BY re.id
      LIMIT 20 OFFSET ?
      `,
      [...amenities, String(OFFSET)]
    );

    return this.formatResponse(page, response as SQLRentalResponse[]);
  }
}
