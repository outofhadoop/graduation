<template>
  <div class="loginRoot">
      <div class="loginBox">
          <h1>登录</h1>
          <el-form :model="formLogin">
              <el-form-item required>
                <el-input :model="formLogin.username" placeholder='请输入用户名'></el-input>
              </el-form-item>
              <el-form-item required>
                <el-input :model="formLogin.password" placeholder='请输入密码'></el-input>
              </el-form-item>
               <el-button type="primary">主要按钮</el-button>
          </el-form>
      </div>
  </div>
</template>
<script>
export default {
  data () {
      return {
            formLogin: {
                username: '',
                password: ''
            }
      }
  }
}
</script>
<style lang="css" scoped>
    h1{font-size: 1.2rem;}
</style>

