import Rental from './Rental.interface';

interface GetRentalResult {
  page: number;
  pageTotal: number;
  rental: Rental[];
}

export default GetRentalResult;
