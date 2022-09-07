import Address from './Address.interface';

interface Rental {
  id: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  floor: number;
  animal: boolean;
  furnished: boolean;
  hoa: number;
  rent: number;
  tax: number;
  fireInsurance: number;
  address: Address;
}

export default Rental;
