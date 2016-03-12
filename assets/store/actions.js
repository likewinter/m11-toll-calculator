import { getDefaultTrip } from '../utils';
import * as types from './mutation-types';
import _ from 'lodash';

/*
 LISTS
 */
export const addTripList = ({ dispatch }, listName) => dispatch(types.ADD_TRIP_LIST, listName);
export const cleanList = ({ dispatch }, listName) => dispatch(types.CLEAN_LIST, listName);
export const cleanAllLists = ({ dispatch }) => dispatch(types.CLEAN_ALL_LISTS);

/*
 ADDING TRIPS
 */
export const addTrip = ({ dispatch }, listName, trip) =>
  dispatch(types.ADD_TRIPS, listName, [trip]);
export const addTrips = ({ dispatch }, listName, trips) =>
  dispatch(types.ADD_TRIPS, listName, trips);
export const addDefaultTrip = ({ dispatch }, listName) =>
  dispatch(types.ADD_TRIPS, listName, [getDefaultTrip()]);

/*
 MODIFY TRIPS
 */
export const updateTrip = ({ dispatch }, listName, index, trip) =>
  dispatch(types.UPDATE_TRIP, listName, index, trip);
export const swapDirections = ({ dispatch, state: { tripLists } }, listName, index) => {
  dispatch(types.UPDATE_TRIP, listName, index, {
    direction: {
      from: tripLists[listName][index].direction.to,
      to: tripLists[listName][index].direction.from,
    },
  });
};
export const removeTrip = ({ dispatch }, listName, index) =>
  dispatch(types.REMOVE_TRIP, listName, index);

/*
 FETCH INITIAL STATE
 */
export const getInitialData = ({ dispatch }) => {
  fetch('/json/tarifs.json')
    .then(response => response.json())
    .then(json => {
      dispatch(types.SET_RATES, json);
      dispatch(types.SET_DIRECTIONS, _(json).map('from', 'to').uniq().value());
    });
};
