// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vuex from 'vuex'
import ElementUI from 'element-ui'
import App from './App'
import router from './router'
import  'element-ui/lib/theme-chalk/index.css'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import axios from 'axios'
import store from './store/store'
import { mapMutations, mapState, mapActions, mapGetters } from 'vuex'
Vue.component('icon', Icon);
Vue.prototype.$http = axios;
// Vue.use(vuex)
Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App, Icon },
  template: '<App/>'
})
