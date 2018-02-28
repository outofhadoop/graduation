<template>
  <div class="index">
    <top-nav @login-show="loginShow"></top-nav>
    <login-box v-show="loginBoxShow" @login-show="loginShow"></login-box>
    <index-main-middle-box></index-main-middle-box>
  </div>
</template>

<script>
import indexTopNav from '@/components/topBar/indexTopBar'
import login from '@/components/login'
import indexMainBox from '@/components/index_main/indexMainBox'
export default {
  name: 'index',
  data () {
    return {
      loginBoxShow: false,
    }
  },
  components: {
    'top-nav': indexTopNav,
    'loginBox': login,
    'index-main-middle-box': indexMainBox
  },
  methods: {
    loginShow () {
      this.loginBoxShow = !this.loginBoxShow;
      console.log(this.loginBoxShow);
    }
  }
}
</script>

<style>
.index{
  background-color: #f4f5f5;
}
</style>
