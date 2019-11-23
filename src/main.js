import Vue from 'vue'
import App from './App.vue'
import router from './route/router'
import store from './store/store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueSidebarMenu from 'vue-sidebar-menu'

Vue.use(VueSidebarMenu)
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
