import Vue from 'vue'
import Vuelidate from 'vuelidate'
import axios from 'axios'


import App from './App.vue'
import router from './router'
import store from './store/store.js'
Vue.use(Vuelidate)

import '@/assets/css/tailwind.css'

axios.defaults.baseURL = 'https://bugtracker-springboot.herokuapp.com'
// Vue.http.headers.common['Access-Control-Request-Method'] = '*'

Vue.config.productionTip = false
// Vue.protoType.$http = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


