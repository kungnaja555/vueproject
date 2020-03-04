import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router/index'
import plugins from './plugins/index'
import store from './store';

Vue.config.productionTip = false

Vue.use(plugins)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
