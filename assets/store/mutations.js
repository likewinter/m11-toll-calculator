import { merge } from 'lodash';
import * as types from './mutation-types';

export default {
  [types.ADD_TRIP_LIST](state, listName) {
    state.tripLists = { ...state.tripLists, [listName]: [] };
  },
  [types.ADD_TRIPS](state, listName, trips) {
    state.tripLists[listName] = [...state.tripLists[listName], ...trips];
  },
  [types.REMOVE_TRIP](state, listName, index) {
    state.tripLists[listName].splice(index, 1);
  },
  [types.UPDATE_TRIP](state, listName, index, trip) {
    state.tripLists[listName].$set(index, merge(state.tripLists[listName][index], trip));
  },
  [types.CLEAN_LIST](state, listName) {
    state.tripLists[listName] = [];
  },
  [types.CLEAN_ALL_LISTS](state) {
    state.tripLists = [];
  },
  [types.SET_RATES](state, rates) {
    state.rates = rates;
  },
  [types.SET_DIRECTIONS](state, directions) {
    state.directions = directions;
  },
};
