interface NumericFilter {
  min: number;
  max: number;
}

interface RentalNumericFilters {
  price: NumericFilter;
  area: NumericFilter;
  bedrooms: number;
  bathrooms: number;
  parking: number;
}

export default RentalNumericFilters;
