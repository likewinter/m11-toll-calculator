import {getDefaultTrip} from '../utils';
import * as types from './mutation-types';

export default {
  removeTrip: types.REMOVE_TRIP,
  updateTrip: types.UPDATE_TRIP,
  cleanTrips: types.CLEAN_TRIPS,
  addDefaultTrip({dispatch}) {
    dispatch(types.ADD_TRIP, getDefaultTrip());
  },
  swapDirections({dispatch, state: {tripList}}, index) {
    dispatch(types.UPDATE_TRIP, index, {
      direction: {
        from: tripList[index].direction.to,
        to: tripList[index].direction.from,
      },
    });
  },
};
