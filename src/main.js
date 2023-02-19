import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router/index';
import store from '@/store';
import axios from 'axios';


Vue.config.productionTip = false

Vue.prototype.$axios = axios
axios.defaults.baseURL="http://localhost:9999/"

Vue.use(ElementUI);
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
