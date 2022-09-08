interface SQLRentalResponse {
  id: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  floor: number;
  animal: number;
  furnished: number;
  hoa: number;
  rent: number;
  tax: number;
  fire_insurance: number;
  address_id: number;
  latitude: number;
  longitude: number;
  neighborhood: string;
  zipcode: string;
  street: string;
  number: string;
  city_name: string;
  state_name: string;
  short: string;
  page_count: string;
  [key: string]: unknown;
}

export default SQLRentalResponse;
