import Vuex from 'vuex';
import Vue from 'vue';
import VueResource from 'vue-resource';
import _ from 'lodash';

import mutations from './mutations';
import actions from './actions';
import {SET_DIRECTIONS, SET_RATES} from './mutation-types';

Vue.use(Vuex);
Vue.use(VueResource);

const state = {
  rates: [],
  directions: [],
  tripList: [],
};

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  strict: process.env.NODE_ENV !== 'production',
});

Vue.http.get('json/tarifs.json', (data) => {
  store.dispatch(SET_RATES, data);
  store.dispatch(SET_DIRECTIONS, _(data).pluck('from', 'to').uniq().value());
});

export default store;
