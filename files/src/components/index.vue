<template>
  <div class="index">
    <top-nav @login-show="loginShow"></top-nav>
    <login-box v-show="loginBoxShow"></login-box>
  </div>
</template>

<script>
import indexTopNav from '@/components/topBar/indexTopBar'
import login from '@/components/login'
export default {
  name: 'index',
  data () {
    return {
      loginBoxShow: false,
    }
  },
  components: {
    'top-nav': indexTopNav,
    'loginBox': login
  },
  methods: {
    loginShow () {
      this.loginBoxShow = !this.loginBoxShow;
      console.log(this.loginBoxShow);
    }
  }
}
</script>

<style scoped>

</style>
