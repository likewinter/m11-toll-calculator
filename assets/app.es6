import Vue from 'vue';
import ResourcePlugin from 'vue-resource';
import RouterPlugin from 'vue-router';
import App from './components/App';

Vue.use(ResourcePlugin);
Vue.use(RouterPlugin);

if (process.env.NODE_ENV !== 'production') {
  Vue.config.debug = true;
}

export default new Vue({
  el: 'body',
  components: {App},
});
