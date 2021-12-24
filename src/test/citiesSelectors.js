import { createSelector } from '@reduxjs/toolkit';

const getCities = state => state.cities.data.items;
const getLoading = state => state.cities.data.loading;
const getError = state => state.cities.data.error;
const getFilter = state => state.cities.filter;

// const getFilteredCities = state => {
//   const cities = getCities(state);
//   const filter = getFilter(state);
//   const normalizedFilter = filter.toLowerCase();

//   return cities.filter(city =>
//     city.name.toLowerCase().includes(normalizedFilter),
//   );
// };

const getFilteredCities = createSelector(
  [getCities, getFilter],
  (cities, filter) => {
    const normalizedFilter = filter.toLowerCase();
    return cities.filter(city =>
      city.name.toLowerCase().includes(normalizedFilter),
    );
  },
);

export { getCities, getLoading, getError, getFilter, getFilteredCities };
