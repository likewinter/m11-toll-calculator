import {getDefaultTrip} from '../utils';

export default {
  removeTrip: 'REMOVE_TRIP',
  updateTrip: 'UPDATE_TRIP',
  cleanTrips: 'CLEAN_TRIPS',
  addDefaultTrip({dispatch}) {
    dispatch('ADD_TRIP', getDefaultTrip());
  },
  swapDirections({dispatch, state: {tripList}}, index) {
    dispatch('UPDATE_TRIP', index, {
      direction: {
        from: tripList[index].direction.to,
        to: tripList[index].direction.from,
      },
    });
  },
};
