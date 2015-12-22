import {merge} from 'lodash';
import * as types from './mutation-types';

export default {
  [types.ADD_TRIP](state, trip) {
    return state.tripList.push(trip);
  },
  [types.REMOVE_TRIP](state, index) {
    state.tripList.splice(index, 1);
  },
  [types.UPDATE_TRIP](state, index, trip) {
    state.tripList.$set(index, merge(state.tripList[index], trip));
  },
  [types.CLEAN_TRIPS](state) {
    state.tripList = [];
  },
  [types.SET_RATES](state, rates) {
    state.rates = rates;
  },
  [types.SET_DIRECTIONS](state, directions) {
    state.directions = directions;
  },
};
