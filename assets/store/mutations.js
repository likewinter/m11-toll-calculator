import {merge, extend} from 'lodash';
import * as types from './mutation-types';

export default {
  [types.ADD_TRIP_LIST](state, listName) {
    state.tripLists = extend({}, state.tripLists, {[listName]: []});
  },
  [types.ADD_TRIP](state, listName, trip) {
    state.tripLists[listName].push(trip);
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
