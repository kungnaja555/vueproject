import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vuetify from './plugins/vuetify';
import router from './router/index'
import plugins from './plugins/index'
import store from './store';

Vue.config.productionTip = false

Vue.use(VueAxios,axios)
Vue.use(plugins)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
