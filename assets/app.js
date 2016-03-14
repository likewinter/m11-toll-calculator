import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './components/App';
import MultipleTrips from './components/multiple_trips';
import OneRoute from './components/one_route';

Vue.use(VueRouter);

if (process.env.NODE_ENV !== 'production') {
  Vue.config.debug = true;
}

const router = new VueRouter({
  linkActiveClass: 'active',
  history: true,
});

router.map({
  '/multiple-routes': {
    name: 'multiple',
    component: MultipleTrips,
  },
  '/one-route': {
    name: 'single',
    component: OneRoute,
  },
});

router.start(App, '#app');
