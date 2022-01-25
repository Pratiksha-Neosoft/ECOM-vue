import Vue from 'vue'
import App from './App.vue'
import loading from 'vuejs-loading-screen'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.all.min.js'
import router from './router/index'
import store from './store/store';
import Vuelidate from 'vuelidate'
Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(loading,{
  bg: '#41b883ad',
  slot: `
    <div class="px-5 py-3 bg-gray-800 rounded">
      <h3 class="text-3xl text-white"><i class="fa fa-spinner"></i> Loading...</h3>
    </div>
  `
})
Vue.use(VueSweetalert2)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
