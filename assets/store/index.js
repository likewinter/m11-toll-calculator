import Vuex from 'vuex';
import Vue from 'vue';
import VueResource from 'vue-resource';
import _ from 'lodash';

import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);
Vue.use(VueResource);

const state = {
  rates: [],
  directions: [],
  tripList: [],
};

Vue.http.get('/json/tarifs.json', (data) => {
  state.rates = data;
  state.directions = _(data).pluck('from', 'to').uniq().value();
});

const store = new Vuex.Store({state, actions, mutations});

export default store;
