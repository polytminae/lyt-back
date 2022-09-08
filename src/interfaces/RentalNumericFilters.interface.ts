export interface MinMaxFilter {
  min?: number;
  max?: number;
}

interface RentalNumericFilters {
  [key: string]: number | MinMaxFilter;
}

export default RentalNumericFilters;
