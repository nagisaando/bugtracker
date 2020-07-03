import Vue from 'vue'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
import App from './App.vue'
import router from './router'

import '@/assets/css/tailwind.css'


Vue.config.productionTip = false
// Vue.protoType.$http = axios;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


