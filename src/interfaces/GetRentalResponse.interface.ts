interface GetRentalResponse {
  id: number;
  area: number;
  rooms: number;
  bathrooms: number;
  parking_spaces: number;
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
  number: number;
  city_name: string;
  state_name: string;
  short: string;
}

export default GetRentalResponse;
