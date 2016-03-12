import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';

Vue.use(Vuex);

const state = {
  rates: [],
  directions: [],
  tripLists: {},
};

const store = new Vuex.Store({
  state,
  mutations,
  strict: process.env.NODE_ENV !== 'production',
});

export default store;
