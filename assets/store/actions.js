import {getDefaultTrip} from '../utils';
import * as types from './mutation-types';

export default {
  removeTrip: types.REMOVE_TRIP,
  updateTrip: types.UPDATE_TRIP,
  cleanList: types.CLEAN_LIST,
  cleanAllLists: types.CLEAN_ALL_LISTS,
  addTripList: types.ADD_TRIP_LIST,
  addDefaultTrip({dispatch}, listName) {
    dispatch(types.ADD_TRIP, listName, getDefaultTrip());
  },
  swapDirections({dispatch, state: {tripLists}}, listName, index) {
    dispatch(types.UPDATE_TRIP, listName, index, {
      direction: {
        from: tripLists[listName][index].direction.to,
        to: tripLists[listName][index].direction.from,
      },
    });
  },
};
