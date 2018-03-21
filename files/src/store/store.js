import Vue from 'vue'
import Vuex from 'vuex'
import imgLink from './imgLink/imgLink'
import login from './login/login'
Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        imgLink,
        login
    }
})