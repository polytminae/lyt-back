import State from './State.interface';

interface Address {
  id: number;
  latitude: number;
  longitude: number;
  neighborhood: string;
  zipcode: string;
  street: string;
  streetNumber: string;
  city: string;
  state: State;
}

export default Address;
