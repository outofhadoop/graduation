<template>
  <div class="index">
    <top-nav @login-show="loginShow"  @register-show="registerShow"></top-nav>
    <login-box v-show="loginBoxShow" @login-show="loginShow"></login-box>
    <register v-show="registerBoxShow" @register-show="registerShow"></register>
    <index-main-middle-box></index-main-middle-box>
    
  </div>
</template>

<script>
import indexTopNav from '@/components/topBar/indexTopBar'
import login from '@/components/login'
import register from '@/components/register'
import indexMainBox from '@/components/index_main/indexMainBox'
export default {
  name: 'index',
  data () {
    return {
      loginBoxShow: false,
      registerBoxShow: false
    }
  },
  components: {
    'top-nav': indexTopNav,
    'loginBox': login,
    'index-main-middle-box': indexMainBox,
    'register': register
  },
  methods: {
    loginShow () {
      this.loginBoxShow = !this.loginBoxShow;
      console.log(this.loginBoxShow);
    },
    registerShow () {
      this.registerBoxShow = !this.registerBoxShow;
      console.log(this.registerBoxShow)
    }
  }
}
</script>

<style>
.index{
  background-color: #f4f5f5;
}
.ul{
  -webkit-margin-before: 0px;
  -webkit-margin-after: 0px;
  list-style-type: circle;
  -webkit-margin-start: 0px;
  -webkit-margin-end: 0px;
  -webkit-padding-start: 40px;
}
</style>
