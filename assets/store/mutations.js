import {merge} from 'lodash';

const ADD_TRIP = 'ADD_TRIP';
const REMOVE_TRIP = 'REMOVE_TRIP';
const UPDATE_TRIP = 'UPDATE_TRIP';

export default {
  [ADD_TRIP](state, trip) {
    return state.tripList.push(trip);
  },
  [REMOVE_TRIP](state, index) {
    state.tripList.splice(index, 1);
  },
  [UPDATE_TRIP](state, index, trip) {
    state.tripList.$set(index, merge(state.tripList[index], trip));
  },
};
